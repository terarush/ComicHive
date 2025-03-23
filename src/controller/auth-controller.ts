import { Hono } from "hono";
import type { LoginUserRequest, RegisterUserRequest } from "../model/user-model";
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
