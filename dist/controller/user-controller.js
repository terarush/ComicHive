"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const hono_1 = require("hono");
const middleware_1 = require("../middleware/middleware");
const user_service_1 = require("../service/user-service");
const ImgurLibs_1 = require("../lib/ImgurLibs");
const user_validation_1 = require("../validation/user-validation");
exports.userController = new hono_1.Hono();
exports.userController.get("/:username", async (c) => {
    const username = c.req.param("username");
    const response = await user_service_1.UserService.getUserByUsername(username);
    return c.json({
        data: response,
    });
});
exports.userController.get("/", middleware_1.authMiddleware, async (c) => {
    const token = c.get("userId");
    const user = await user_service_1.UserService.getUser(token);
    return c.json({ data: user });
});
exports.userController.patch("/", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const contentType = c.req.header("content-type");
    let request = {};
    request = user_validation_1.UserValidation.UPDATE_USER.parse(request);
    if (contentType?.includes("multipart/form-data")) {
        const formData = await c.req.formData();
        const avatar = formData.get("avatar");
        if (avatar instanceof File) {
            try {
                const { link } = await ImgurLibs_1.ImgurService.uploadImage(avatar);
                request.avatar = link;
            }
            catch (error) {
                return c.json({ error: "Failed to upload image" }, 500);
            }
        }
        else if (typeof avatar === "string") {
            request.avatar = avatar;
        }
        ["username", "name", "email", "first_name", "last_name"].forEach((field) => {
            const value = formData.get(field);
            request[field] =
                value !== null ? value : undefined;
        });
    }
    else if (contentType?.includes("application/json")) {
        request = await c.req.json();
    }
    else {
        return c.json({ error: "Unsupported Content-Type" }, 400);
    }
    const response = await user_service_1.UserService.updateUser(userId, request);
    return c.json({ data: response });
});
exports.userController.post("/change-password", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const request = (await c.req.json());
    const response = await user_service_1.UserService.changePassword(userId, request);
    return c.json(response);
});
