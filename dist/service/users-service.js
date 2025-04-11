"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const http_exception_1 = require("hono/http-exception");
const database_1 = require("../application/database");
class UsersService {
    static async getUsers() {
        const users = await database_1.prismaClient.user.findMany({
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
            throw new http_exception_1.HTTPException(404, {
                message: "Users not found",
            });
        }
        return users;
    }
}
exports.UsersService = UsersService;
