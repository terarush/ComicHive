import { prismaClient } from "../application/database";
import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { AuthValidation } from "../validation/auth-validation";
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class AuthService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    request = AuthValidation.REGISTER.parse(request);
    const usernameCheck = await prismaClient.user.count({
      where: {
        username: request.username,
      },
    });
    if (usernameCheck != 0) {
      throw new createError.BadRequest("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(request.password, 5);

    const user = await prismaClient.user.create({
      data: {
        ...request,
        password: hashedPassword,
      },
    });
    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    request = AuthValidation.LOGIN.parse(request);
    const user = await prismaClient.user.findUnique({
      where: {
        username: request.username,
      },
    });
    if (!user) {
      throw new createError.Unauthorized("Username or password is wrong");
    }
    const isPasswordValid = await bcrypt.compare(request.password, user.password);
    if (!isPasswordValid) {
      throw new createError.Unauthorized("Username or password is wrong");
    }
    const updatedUser = await prismaClient.user.update({
      where: {
        username: request.username,
      },
      data: {
        token: crypto.randomUUID(),
      },
    });
    const response = toUserResponse(updatedUser);
    response.token = updatedUser.token!;
    return response;
  }
}
