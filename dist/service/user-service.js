"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_exception_1 = require("hono/http-exception");
const database_1 = require("../application/database");
const user_validation_1 = require("../validation/user-validation");
class UserService {
    static async getUser(token) {
        const user = await database_1.prismaClient.user.findFirst({
            where: { token },
            include: { contact: true },
        });
        if (!user) {
            throw new http_exception_1.HTTPException(404, { message: "User not found." });
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
    static async updateUser(userId, data) {
        data = user_validation_1.UpdateUserValidation.UPDATE_USER.parse(data);
        const user = await database_1.prismaClient.user.findUnique({
            where: { id: userId },
            include: { contact: true },
        });
        if (!user) {
            throw new http_exception_1.HTTPException(404, { message: "User not found." });
        }
        const updatedUser = await database_1.prismaClient.user.update({
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
exports.UserService = UserService;
