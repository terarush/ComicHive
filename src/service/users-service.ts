import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";

export class UsersService {
  static async getUsers(){
    const users = await prismaClient.user.findMany();

    if(!users) {
      throw new HTTPException(404, {
        message: "Users not found"
      })
    }

    return users;
  }
}
