import { z, ZodType } from "zod";

export class CommentValidation {
  static readonly CREATE_COMMENT: ZodType = z.object({
    content: z.string(),
  });
}
