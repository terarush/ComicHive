import { prismaClient } from "../application/database";
import { LoginUserRequest, RegisterUserRequest } from "../model/user-model";
import { AuthValidation } from "../validation/auth-validation";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
        contact: {
          create: {
            email: request.email,
            first_name: first_name,
            last_name: last_name,
          },
        },
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
}
