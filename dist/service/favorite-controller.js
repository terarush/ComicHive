"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const http_exception_1 = require("hono/http-exception");
const database_1 = require("../application/database");
const favorite_validation_1 = require("../validation/favorite-validation");
class FavoriteService {
    static async getFavorite(userId) {
        return await database_1.prismaClient.favorite.findMany({
            where: { userId },
        });
    }
    static async postFavorite(userId, request) {
        request = favorite_validation_1.FavoriteValidation.CREATE_FAVORITE.parse(request);
        const favoriteCheck = await database_1.prismaClient.favorite.findFirst({
            where: {
                animeId: request.anime_id,
                userId,
            },
        });
        if (favoriteCheck) {
            return {
                message: "Already add to favorite."
            };
        }
        const favorite = await database_1.prismaClient.favorite.create({
            data: {
                animeId: request.anime_id,
                userId,
            },
        });
        return {
            message: "success",
            favorite,
        };
    }
    static async deleteFavorite(userId, request) {
        request = favorite_validation_1.FavoriteValidation.DELETE_FAVORITE.parse(request);
        const favorite = await database_1.prismaClient.favorite.deleteMany({
            where: {
                animeId: request.anime_id,
                userId,
            },
        });
        if (favorite.count === 0) {
            throw new http_exception_1.HTTPException(404, {
                message: "Error not found favorite id",
            });
        }
        return {
            message: "success",
        };
    }
}
exports.FavoriteService = FavoriteService;
