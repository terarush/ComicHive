import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { UserService } from "../service/user-service";

export const userController = new Hono<{ Variables: { token: string } }>();

userController.get("/", authMiddleware, async (c) => {
  const token = c.get("token") as string;
  const user = await UserService.getUser(token);
  return c.json({
    data: user,
  });
});
