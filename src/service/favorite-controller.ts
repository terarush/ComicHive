import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import { CreateFavoriteRequest } from "../model/favorite-model";
import { FavoriteValidation } from "../validation/favorite-validation";

export class FavoriteService {
  static async getFavorite(userId: string) {
    return await prismaClient.favorite.findMany({
      where: { userId },
    });
  }

  static async postFavorite(userId: string, request: CreateFavoriteRequest) {
    request = FavoriteValidation.CREATE_FAVORITE.parse(request);
    const favoriteCheck = await prismaClient.favorite.findFirst({
      where: {
        animeId: request.anime_id,
        userId,
      },
    });
    if(favoriteCheck) {
      return {
        message: "Already add to favorite."
      }
    }
    const favorite = await prismaClient.favorite.create({
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

  static async deleteFavorite(userId: string, request: CreateFavoriteRequest) {
    request = FavoriteValidation.DELETE_FAVORITE.parse(request);
    const favorite = await prismaClient.favorite.deleteMany({
      where: {
        animeId: request.anime_id,
        userId,
      },
    });

    if (favorite.count === 0) {
      throw new HTTPException(404, {
        message: "Error not found favorite id",
      });
    }

    return {
      message: "success",
    };
  }
}
