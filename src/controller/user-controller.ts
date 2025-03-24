import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { UserService } from "../service/user-service";
import { UpdateUserRequest } from "../model/user-model";

export const userController = new Hono<{
  Variables: { token: string; userId: string };
}>();

userController.get("/", authMiddleware, async (c) => {
  const token = c.get("token") as string;
  const user = await UserService.getUser(token);
  return c.json({
    data: user,
  });
});

userController.patch("/", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const request = (await c.req.json()) as UpdateUserRequest;
  const response = await UserService.updateUser(userId, request)
  return c.json({
    data: response
  })
});
