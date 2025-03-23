"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteController = void 0;
const hono_1 = require("hono");
const middleware_1 = require("../middleware/middleware");
const favorite_controller_1 = require("../service/favorite-controller");
exports.favoriteController = new hono_1.Hono();
exports.favoriteController.use("*", middleware_1.authMiddleware);
exports.favoriteController.get("/", async (c) => {
    const userId = c.get("userId");
    const response = await favorite_controller_1.FavoriteService.getFavorite(userId);
    return c.json({
        data: response,
    });
});
exports.favoriteController.post("/", async (c) => {
    const userId = c.get("userId");
    const request = (await c.req.json());
    const response = await favorite_controller_1.FavoriteService.postFavorite(userId, request);
    return c.json({
        data: response,
    });
});
exports.favoriteController.delete("/", async (c) => {
    const userId = c.get("userId");
    const request = (await c.req.json());
    const response = await favorite_controller_1.FavoriteService.deleteFavorite(userId, request);
    return c.json({
        data: response,
    });
});
