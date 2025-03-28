import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import { ChangePasswordRequest, UpdateUserRequest } from "../model/user-model";
import bcrypt from "bcrypt";
import { UserValidation } from "../validation/user-validation";

export class UserService {
  static async getUser(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        token: true,
        contact: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found." });
    }

    return user;
  }

  static async updateUser(userId: string, data: UpdateUserRequest) {
    data = UserValidation.UPDATE_USER.parse(data);

    const userExists = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!userExists) {
      throw new HTTPException(404, { message: "User not found." });
    }

    const contactData =
      data.email || data.first_name || data.last_name
        ? {
          upsert: {
            create: {
              email: data.email ?? "",
              first_name: data.first_name ?? "",
              last_name: data.last_name ?? "",
            },
            update: {
              email: data.email ?? undefined,
              first_name: data.first_name ?? undefined,
              last_name: data.last_name ?? undefined,
            },
          },
        }
        : undefined;

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        username: data.username ?? undefined,
        name: data.name ?? undefined,
        avatar: data.avatar ?? undefined,
        contact: contactData,
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        token: true,
        contact: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    return updatedUser;
  }

  static async changePassword(userId: string, request: ChangePasswordRequest) {
    request = UserValidation.CHANGE_PASSWORD.parse(request);

    if (request.new_password.length < 8) {
      throw new HTTPException(400, { message: "Password must be at least 8 characters long." });
    }

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found." });
    }

    const isMatch = await bcrypt.compare(request.old_password, user.password);
    if (!isMatch) {
      throw new HTTPException(400, { message: "Incorrect old password." });
    }

    const hashedPassword = await bcrypt.hash(request.new_password, 10);
    await prismaClient.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: "Password changed successfully." };
  }
}
