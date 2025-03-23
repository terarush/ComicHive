import { z, ZodType } from "zod";

export class FavoriteValidation {
  static readonly CREATE_FAVORITE: ZodType = z.object({
    anime_id: z.string()
  });
}
