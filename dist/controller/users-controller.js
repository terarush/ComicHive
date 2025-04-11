"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const hono_1 = require("hono");
const middleware_1 = require("../middleware/middleware");
const users_service_1 = require("../service/users-service");
exports.usersController = new hono_1.Hono({});
exports.usersController.get("/", middleware_1.authMiddleware, async (c) => {
    const response = await users_service_1.UsersService.getUsers();
    return c.json({
        data: response,
    });
});
