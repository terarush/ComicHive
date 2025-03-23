import { prismaClient } from "../application/database";
import { CreateCommentRequest } from "../model/comment-model";
import { CommentValidation } from "../validation/comment-validation";

export class commentService {
  static async getComment(animeId: string) {
    const comment = await prismaClient.comment.findMany({
      where: {
        animeId,
      },
    });

    if (comment.length === 0) {
      return {
        message: "There are no comments on this anime yet.",
      };
    }

    return comment;
  }

  static async postComment(
    animeId: string,
    userId: string,
    request: CreateCommentRequest,
  ) {
    request = CommentValidation.CREATE_COMMENT.parse(request)
    const comment = await prismaClient.comment.create({
      data: {
        animeId,
        userId,
        content: request.content,
      },
    });

    return {
      message: "success",
      comment,
    };
  }
}
