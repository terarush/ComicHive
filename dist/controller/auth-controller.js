"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const hono_1 = require("hono");
const auth_service_1 = require("../service/auth-service");
exports.authController = new hono_1.Hono();
exports.authController.post("/register", async (c) => {
    const request = (await c.req.json());
    const response = await auth_service_1.AuthService.register(request);
    c.status(200);
    return c.json({
        data: response,
    });
});
exports.authController.post("/login", async (c) => {
    const request = (await c.req.json());
    const response = await auth_service_1.AuthService.login(request);
    c.status(200);
    return c.json({
        data: response,
    });
});
