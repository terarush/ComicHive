import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import { CreateFavoriteRequest } from "../model/favorite-model";
import { FavoriteValidation } from "../validation/favorite-validation";

export class FavoriteService {
  static async getFavorite(userId: string) {
    const favorites = await prismaClient.favorite.findMany({
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

  static async postFavorite(userId: string, request: CreateFavoriteRequest) {
    request = FavoriteValidation.CREATE_FAVORITE.parse(request);

    const exists = await prismaClient.favorite.count({
      where: {
        animeId: request.anime_id,
        userId,
      },
    });

    if (exists > 0) {
      throw new HTTPException(400, { message: "Already added to favorites." });
    }

    const favorite = await prismaClient.favorite.create({
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

  static async deleteFavorite(userId: string, request: CreateFavoriteRequest) {
    request = FavoriteValidation.DELETE_FAVORITE.parse(request);

    const deleted = await prismaClient.favorite.deleteMany({
      where: {
        animeId: request.anime_id,
        userId,
      },
    });

    if (deleted.count === 0) {
      throw new HTTPException(404, { message: "Favorite not found." });
    }

    return { message: "Removed from favorites." };
  }
}
