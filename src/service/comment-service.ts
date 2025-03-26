import { prismaClient } from "../application/database";
import {
  CreateCommentRequest,
  ReplyCommentRequest,
} from "../model/comment-model";
import { CommentValidation } from "../validation/comment-validation";
import { HTTPException } from "hono/http-exception";

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
          },
        },
      },
    });

    return { comments };
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

  static async replyComment(userId: string, request: ReplyCommentRequest) {
    request = CommentValidation.REPLY_COMMENT.parse(request);

    const existingComment = await prismaClient.comment.findUnique({
      where: { id: request.comment_id },
      select: { id: true },
    });

    if (!existingComment) {
      throw new HTTPException(404, { message: "Comment not found." });
    }

    const reply = await prismaClient.replyComment.create({
      data: {
        content: request.content,
        userId,
        commentId: request.comment_id,
        created_at: new Date(),
      },
      select: {
        id: true,
        content: true,
        created_at: true
      },
    });

    return { message: "Reply added successfully", reply };
  }

  static async deleteReply(userId: string, replyId: string) {
    const request = CommentValidation.DELETE_REPLY.parse({ reply_id: replyId });

    const reply = await prismaClient.replyComment.findUnique({
      where: { id: request.reply_id },
      select: { id: true, userId: true },
    });

    if (!reply) {
      throw new HTTPException(404, { message: "Reply not found." });
    }

    if (reply.userId !== userId) {
      throw new HTTPException(403, { message: "Unauthorized to delete this reply." });
    }

    await prismaClient.replyComment.delete({
      where: { id: request.reply_id },
    });

    return { message: "Reply deleted successfully" };
  }
}

