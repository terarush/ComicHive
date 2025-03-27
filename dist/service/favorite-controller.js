"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const http_exception_1 = require("hono/http-exception");
const database_1 = require("../application/database");
const favorite_validation_1 = require("../validation/favorite-validation");
class FavoriteService {
    static async getFavorite(userId) {
        const favorites = await database_1.prismaClient.favorite.findMany({
            where: { userId },
            select: {
                id: true,
                animeId: true,
                created_at: true,
            },
        });
        if (favorites.length === 0) {
            return { message: "No favorites found." };
        }
        return { favorites };
    }
    static async postFavorite(userId, request) {
        request = favorite_validation_1.FavoriteValidation.CREATE_FAVORITE.parse(request);
        const exists = await database_1.prismaClient.favorite.count({
            where: {
                animeId: request.anime_id,
                userId,
            },
        });
        if (exists > 0) {
            throw new http_exception_1.HTTPException(400, { message: "Already added to favorites." });
        }
        const favorite = await database_1.prismaClient.favorite.create({
            data: {
                animeId: request.anime_id,
                userId,
                created_at: new Date(),
            },
            select: {
                id: true,
                animeId: true,
                created_at: true,
            },
        });
        return { message: "Added to favorites", favorite };
    }
    static async deleteFavorite(userId, request) {
        request = favorite_validation_1.FavoriteValidation.DELETE_FAVORITE.parse(request);
        const deleted = await database_1.prismaClient.favorite.deleteMany({
            where: {
                animeId: request.anime_id,
                userId,
            },
        });
        if (deleted.count === 0) {
            throw new http_exception_1.HTTPException(404, { message: "Favorite not found." });
        }
        return { message: "Removed from favorites." };
    }
}
exports.FavoriteService = FavoriteService;
