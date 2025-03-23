"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const database_1 = require("../application/database");
const http_exception_1 = require("hono/http-exception");
const authMiddleware = async (c, next) => {
    const token = c.req.header("x-token");
    const user = await database_1.prismaClient.user.findFirst({
        where: {
            token: token,
        },
    });
    if (!user) {
        throw new http_exception_1.HTTPException(401, {
            message: "Unauthorized",
        });
    }
    c.set('token', token);
    c.set('userId', user.id);
    return next();
};
exports.authMiddleware = authMiddleware;
