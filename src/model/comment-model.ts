export type CreateCommentRequest = {
  content: string;
}

export type ReplyCommentRequest = {
  comment_id: string;
  content: string;
}
