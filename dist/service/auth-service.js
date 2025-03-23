"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("../application/database");
const auth_validation_1 = require("../validation/auth-validation");
const http_exception_1 = require("hono/http-exception");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    static async register(request) {
        request = auth_validation_1.AuthValidation.REGISTER.parse(request);
        const usernameExists = await database_1.prismaClient.user.count({
            where: { username: request.username },
        });
        if (usernameExists > 0) {
            throw new http_exception_1.HTTPException(400, { message: "Username already exists" });
        }
        const emailExists = await database_1.prismaClient.contact.count({
            where: { email: request.email },
        });
        if (emailExists > 0) {
            throw new http_exception_1.HTTPException(400, { message: "Email already exists" });
        }
        request.password = await bcrypt_1.default.hash(request.password, 10);
        const first_name = request.first_name;
        const last_name = request.last_name;
        const name = first_name + " " + last_name;
        const user = await database_1.prismaClient.user.create({
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
    static async login(request) {
        request = auth_validation_1.AuthValidation.LOGIN.parse(request);
        const user = await database_1.prismaClient.user.findUnique({
            where: { username: request.username },
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
        const token = crypto_1.default.randomUUID();
        await database_1.prismaClient.user.update({
            where: { username: request.username },
            data: { token },
        });
        return { token };
    }
}
exports.AuthService = AuthService;
