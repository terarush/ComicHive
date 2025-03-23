import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";

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
      contacts: {
        email: user.contact?.email || null,
        first_name: user.contact?.first_name || null,
        last_name: user.contact?.last_name || null,
      },
    };
  }
}
