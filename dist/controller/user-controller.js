"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const hono_1 = require("hono");
const middleware_1 = require("../middleware/middleware");
const user_service_1 = require("../service/user-service");
exports.userController = new hono_1.Hono();
exports.userController.get("/", middleware_1.authMiddleware, async (c) => {
    const token = c.get("userId");
    const user = await user_service_1.UserService.getUser(token);
    return c.json({
        data: user,
    });
});
exports.userController.patch("/", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const request = (await c.req.json());
    const response = await user_service_1.UserService.updateUser(userId, request);
    return c.json({
        data: response
    });
});
exports.userController.post("/change-password", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const request = (await c.req.json());
    const response = await user_service_1.UserService.changePassword(userId, request);
    return c.json(response);
});
