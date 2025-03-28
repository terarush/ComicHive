import { prismaClient } from "../application/database";
import { CreateCommentRequest } from "../model/comment-model";
import { CommentValidation } from "../validation/comment-validation";

export class CommentService {
  static async getComment(animeId: string) {
    const commentCount = await prismaClient.comment.count({
      where: { animeId },
    });

    if (commentCount === 0) {
      return { message: "There are no comments on this anime yet." };
    }

    const comments = await prismaClient.comment.findMany({
      where: { animeId },
      select: {
        id: true,
        content: true,
        created_at: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });

    return comments;
  }

  static async postComment(
    animeId: string,
    userId: string,
    request: CreateCommentRequest,
  ) {
    request = CommentValidation.CREATE_COMMENT.parse(request);

    const comment = await prismaClient.comment.create({
      data: {
        animeId,
        userId,
        content: request.content,
        created_at: new Date(),
      },
      select: {
        id: true,
        content: true,
        created_at: true,
      },
    });

    return { message: "Success", comment };
  }
}
