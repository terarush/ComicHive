import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";

export class UsersService {
  static async getUsers() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        role: true,
        contact: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });

    if (!users) {
      throw new HTTPException(404, {
        message: "Users not found",
      });
    }

    return users;
  }
}
