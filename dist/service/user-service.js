"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_exception_1 = require("hono/http-exception");
const database_1 = require("../application/database");
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
            contacts: {
                email: user.contact?.email || null,
                first_name: user.contact?.first_name || null,
                last_name: user.contact?.last_name || null,
            },
        };
    }
}
exports.UserService = UserService;
