import { prismaClient } from "../application/database";
import { LoginUserRequest, RegisterUserRequest } from "../model/user-model";
import { AuthValidation } from "../validation/auth-validation";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendMail } from "../application/smtp";

export class AuthService {
  static async register(
    request: RegisterUserRequest,
  ): Promise<{ message: string; user: object }> {
    request = AuthValidation.REGISTER.parse(request);

    const usernameExists = await prismaClient.user.count({
      where: { username: request.username },
    });

    if (usernameExists > 0) {
      throw new HTTPException(400, { message: "Username already exists" });
    }

    const existingContact = await prismaClient.contact.findUnique({
      where: { email: request.email },
    });

    if (existingContact) {
      throw new HTTPException(400, { message: "Email already exists" });
    }

    request.password = await bcrypt.hash(request.password, 10);
    const first_name = request.first_name as string;
    const last_name = request.last_name as string;
    const name = first_name + " " + last_name;
    const user = await prismaClient.user.create({
      data: {
        username: request.username,
        password: request.password,
        name: name,
        role: "MEMBER",
        contact: {
          create: {
            email: request.email,
            first_name: first_name,
            last_name: last_name,
          },
        },
        created_at: new Date(),
      },
      select: {
        id: true,
        username: true,
        name: true,
        contact: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    return {
      message: "Register success",
      user,
    };
  }

  static async login(request: LoginUserRequest): Promise<{ token: string }> {
    request = AuthValidation.LOGIN.parse(request);

    const user = await prismaClient.user.findUnique({
      where: { username: request.username },
    });

    if (!user) {
      throw new HTTPException(401, {
        message: "Username or password is wrong",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HTTPException(401, {
        message: "Username or password is wrong",
      });
    }

    const token = crypto.randomUUID();
    await prismaClient.user.update({
      where: { username: request.username },
      data: { token },
    });

    return { token };
  }
  static async requestResetPassword(
    email: string,
  ): Promise<{ message: string }> {
    const contact = await prismaClient.contact.findUnique({
      where: { email },
      include: { user: true },
    });

    if (!contact || !contact.user) {
      throw new HTTPException(404, { message: "Email not found" });
    }

    const existingToken = await prismaClient.resetPasswordToken.findFirst({
      where: {
        userId: contact.user.id,
        createdAt: {
          gte: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
      },
    });

    if (existingToken) {
      throw new HTTPException(400, {
        message:
          "Reset password already requested recently. Please wait up to 4 hours.",
      });
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prismaClient.resetPasswordToken.create({
      data: {
        token,
        userId: contact.user.id,
        expiresAt,
      },
    });

    const resetLink = `https://your-app.com/reset-password?token=${token}`;

    await sendMail({
      to: email,
      subject: "Reset Password Request",
      html: `
        <h2>Reset Password</h2>
        <p>Klik link di bawah untuk mengatur ulang password Anda:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link ini akan kedaluwarsa dalam 4 jam.</p>
      `,
    });

    return { message: "Reset password link has been sent to your email" };
  }

  static async resetPasswordWithToken(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const resetToken = await prismaClient.resetPasswordToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || !resetToken.user) {
      throw new HTTPException(400, { message: "Invalid token" });
    }

    if (new Date() > new Date(resetToken.expiresAt)) {
      throw new HTTPException(400, { message: "Token has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prismaClient.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    await prismaClient.resetPasswordToken.delete({
      where: { token },
    });

    return { message: "Password has been reset successfully" };
  }
}
