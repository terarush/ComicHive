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
exports.authController.post('/reset-password', async (c) => {
    const body = await c.req.json();
    const email = body.email;
    if (!email) {
        return c.json({ message: "Email is required" }, 400);
    }
    const result = await auth_service_1.AuthService.requestResetPassword(email);
    return c.json(result);
});
exports.authController.post('/reset-password/token', async (c) => {
    const token = c.req.query('q');
    const { new_password } = await c.req.json();
    if (!token || !new_password) {
        return c.json({ message: 'Token and new password are required' }, 400);
    }
    const result = await auth_service_1.AuthService.resetPasswordWithToken(token, new_password);
    return c.json(result);
});
