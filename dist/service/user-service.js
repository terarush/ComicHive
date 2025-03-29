"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_exception_1 = require("hono/http-exception");
const database_1 = require("../application/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validation_1 = require("../validation/user-validation");
class UserService {
    static async getUser(userId) {
        const user = await database_1.prismaClient.user.findUnique({
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
            throw new http_exception_1.HTTPException(404, { message: "User not found." });
        }
        return user;
    }
    static async updateUser(userId, data) {
        data = user_validation_1.UserValidation.UPDATE_USER.parse(data);
        const userExists = await database_1.prismaClient.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!userExists) {
            throw new http_exception_1.HTTPException(404, { message: "User not found." });
        }
        const contactData = data.email || data.first_name || data.last_name
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
        const updatedUser = await database_1.prismaClient.user.update({
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
    static async changePassword(userId, request) {
        request = user_validation_1.UserValidation.CHANGE_PASSWORD.parse(request);
        if (request.new_password.length < 8) {
            throw new http_exception_1.HTTPException(400, {
                message: "Password must be at least 8 characters long.",
            });
        }
        const user = await database_1.prismaClient.user.findUnique({
            where: { id: userId },
            select: { password: true },
        });
        if (!user) {
            throw new http_exception_1.HTTPException(404, { message: "User not found." });
        }
        const isMatch = await bcrypt_1.default.compare(request.old_password, user.password);
        if (!isMatch) {
            throw new http_exception_1.HTTPException(400, { message: "Incorrect old password." });
        }
        const hashedPassword = await bcrypt_1.default.hash(request.new_password, 10);
        await database_1.prismaClient.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return { message: "Password changed successfully." };
    }
}
exports.UserService = UserService;
