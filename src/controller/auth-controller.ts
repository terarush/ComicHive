import { Hono } from "hono";
import type {
  LoginUserRequest,
  RegisterUserRequest,
} from "../model/user-model";
import { AuthService } from "../service/auth-service";

export const authController = new Hono();

authController.post("/register", async (c) => {
  const request = (await c.req.json()) as RegisterUserRequest;
  const response = await AuthService.register(request);
  c.status(200);
  return c.json({
    data: response,
  });
});

authController.post("/login", async (c) => {
  const request = (await c.req.json()) as LoginUserRequest;
  const response = await AuthService.login(request);
  c.status(200);
  return c.json({
    data: response,
  });
});

authController.post('/reset-password', async (c) => {
  const body = await c.req.json();
  const email = body.email as string;

  if (!email) {
    return c.json({ message: "Email is required" }, 400);
  }

  const result = await AuthService.requestResetPassword(email);
  return c.json(result);
});

authController.post('/reset-password/token', async (c) => {
  const token = c.req.query('q');
  const { new_password } = await c.req.json();

  if (!token || !new_password) {
    return c.json({ message: 'Token and new password are required' }, 400);
  }

  const result = await AuthService.resetPasswordWithToken(token, new_password);
  return c.json(result);
});

