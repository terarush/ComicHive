import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import { UpdateUserRequest } from "../model/user-model";
import { UpdateUserValidation } from "../validation/user-validation";

export class UserService {
  static async getUser(token: string) {
    const user = await prismaClient.user.findFirst({
      where: { token },
      include: { contact: true },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found." });
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      contacts: {
        email: user.contact?.email || null,
        first_name: user.contact?.first_name || null,
        last_name: user.contact?.last_name || null,
      },
    };
  }

  static async updateUser(userId: string, data: UpdateUserRequest) {
    data = UpdateUserValidation.UPDATE_USER.parse(data);
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: { contact: true },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found." });
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        username: data.username ?? user.username,
        name: data.name ?? user.name,
        avatar: data.avatar ?? user.avatar,
        contact: user.contact
          ? {
              update: {
                email: data.email ?? user.contact.email,
                first_name: data.first_name ?? user.contact.first_name,
                last_name: data.last_name ?? user.contact.last_name,
              },
            }
          : undefined,
      },
      include: {
        contact: true,
      },
    });

    return {
      username: updatedUser.username,
      name: updatedUser.name,
      avatar: updatedUser.avatar,
      contact: updatedUser.contact,
    };
  }
}
