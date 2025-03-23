"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("../application/database");
const user_model_1 = require("../model/user-model");
const auth_validation_1 = require("../validation/auth-validation");
const http_exception_1 = require("hono/http-exception");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    static async register(request) {
        request = auth_validation_1.AuthValidation.REGISTER.parse(request);
        const usernameCheck = await database_1.prismaClient.user.count({
            where: {
                username: request.username,
            },
        });
        if (usernameCheck !== 0) {
            throw new http_exception_1.HTTPException(400, {
                message: "Username already exists",
            });
        }
        request.password = await bcrypt_1.default.hash(request.password, 5);
        const user = await database_1.prismaClient.user.create({
            data: request,
        });
        return (0, user_model_1.toUserResponse)(user);
    }
    static async login(request) {
        request = auth_validation_1.AuthValidation.LOGIN.parse(request);
        let user = await database_1.prismaClient.user.findUnique({
            where: {
                username: request.username,
            },
        });
        if (!user) {
            throw new http_exception_1.HTTPException(401, {
                message: "Username or password is wrong",
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(request.password, user.password);
        if (!isPasswordValid) {
            throw new http_exception_1.HTTPException(401, {
                message: "Username or password is wrong",
            });
        }
        user = await database_1.prismaClient.user.update({
            where: {
                username: request.username,
            },
            data: {
                token: crypto.randomUUID(),
            },
        });
        const response = (0, user_model_1.toUserResponse)(user);
        response.token = user.token;
        return response;
    }
}
exports.AuthService = AuthService;
