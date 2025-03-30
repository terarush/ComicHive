import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import {
  CreateCommentRequest,
  ReplyCommentRequest,
} from "../model/comment-model";
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
      where: {
        animeId,
      },
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
        replies: {
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
              },
            },
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

  static async deleteComment(userId: string, commentId: string) {
    const comment = await prismaClient.comment.findUnique({
      where: { id: commentId, userId },
    });

    if (!comment) {
      throw new HTTPException(404, { message: "Comment not found" });
    }

    await prismaClient.comment.delete({
      where: {
        id: commentId,
      },
    });

    return { message: "Comment deleted" };
  }

  static async replyComment(userId: string, request: ReplyCommentRequest) {
    request = CommentValidation.REPLY_COMMENT.parse(request);
    const comment = await prismaClient.comment.findUnique({
      where: { id: request.comment_id },
    });

    if (!comment) {
      throw new HTTPException(404, { message: "Comment not found" });
    }

    const reply = await prismaClient.replyComment.create({
      data: {
        userId,
        content: request.content,
        commentId: request.comment_id,
        created_at: new Date(),
      },
      select: {
        id: true,
        content: true,
        created_at: true,
      },
    });

    return reply;
  }

  static async deleteReplyComment(userId: string, replyId: string) {
    const reply = await prismaClient.replyComment.findUnique({
      where: { id: replyId, userId },
    });

    if (!reply) {
      throw new HTTPException(404, { message: "Reply not found" });
    }

    await prismaClient.replyComment.delete({
      where: {
        id: replyId,
      },
    });

    return { message: "Reply deleted" };
  }
}
