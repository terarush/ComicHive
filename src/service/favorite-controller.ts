import { prismaClient } from "../application/database";

export class FavoriteService {
  static async getFavorite(userId: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    const favorite = await prismaClient.favorite.findMany({
      where: {
        userId: user?.id,
      },
    });

    if (!favorite) {
      return {
        favorite: null,
      };
    }

    return favorite;
  }
}
