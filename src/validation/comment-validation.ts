import { z, ZodType } from "zod";

export class CommentValidation {
  static readonly CREATE_COMMENT: ZodType = z.object({
    content: z.string(),
  });
  static readonly REPLY_COMMENT: ZodType = z.object({
    comment_id: z.string(),
    content: z.string(),
  });
  static readonly DELETE_REPLY: ZodType = z.object({
    reply_id: z.string(),
  });
}
