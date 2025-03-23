import { prismaClient } from "../application/database";
import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { AuthValidation } from "../validation/auth-validation";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcrypt";

export class AuthService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    request = AuthValidation.REGISTER.parse(request);
    const usernameCheck = await prismaClient.user.count({
      where: {
        username: request.username,
      },
    });
    if (usernameCheck !== 0) {
      throw new HTTPException(400, {
        message: "Username already exists",
      });
    }

    request.password = await bcrypt.hash(request.password, 5);

    const user = await prismaClient.user.create({
      data: request,
    });
    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    request = AuthValidation.LOGIN.parse(request);
    let user = await prismaClient.user.findUnique({
      where: {
        username: request.username,
      },
    });

    if (!user) {
      throw new HTTPException(401, {
        message: "Username or password is wrong",
      });
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password);
    if (!isPasswordValid) {
      throw new HTTPException(401, {
        message: "Username or password is wrong",
      });
    }

    user = await prismaClient.user.update({
      where: {
        username: request.username,
      },
      data: {
        token: crypto.randomUUID(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }
}

