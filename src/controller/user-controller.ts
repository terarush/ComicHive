import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { UserService } from "../service/user-service";
import { ImgurService } from "../lib/ImgurLibs";
import { ChangePasswordRequest, UpdateUserRequest } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";

export const userController = new Hono<{
  Variables: { token: string; userId: string };
}>();

userController.get("/", authMiddleware, async (c) => {
  const token = c.get("userId") as string;
  const user = await UserService.getUser(token);
  return c.json({ data: user });
});

userController.patch("/", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const contentType = c.req.header("content-type");

  let request: UpdateUserRequest = {};
  request = UserValidation.UPDATE_USER.parse(request);

  if (contentType?.includes("multipart/form-data")) {
    const formData = await c.req.formData();
    const avatar = formData.get("avatar") as File | string | null;

    if (avatar instanceof File) {
      try {
        const { link } = await ImgurService.uploadImage(avatar);
        request.avatar = link;
      } catch (error) {
        return c.json({ error: "Failed to upload image" }, 500);
      }
    } else if (typeof avatar === "string") {
      request.avatar = avatar;
    }

    ["username", "name", "email", "first_name", "last_name"].forEach(
      (field) => {
        const value = formData.get(field);
        request[field as keyof UpdateUserRequest] =
          value !== null ? (value as string) : undefined;
      },
    );
  } else if (contentType?.includes("application/json")) {
    request = await c.req.json();
  } else {
    return c.json({ error: "Unsupported Content-Type" }, 400);
  }

  const response = await UserService.updateUser(userId, request);
  return c.json({ data: response });
});

userController.post("/change-password", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const request = (await c.req.json()) as ChangePasswordRequest;
  const response = await UserService.changePassword(userId, request);
  return c.json(response);
});
