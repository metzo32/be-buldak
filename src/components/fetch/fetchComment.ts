import { deleteCall, get, post, put } from "@/api/api";
import type { CommentReq, CommentRes } from "@/types/FetchCommentType";

// 댓글 등록
export async function postComment(comment: CommentReq) {
  const data = await post<CommentRes>("/api/comments", comment);

  return data;
}

// 댓글 상세 보기
export async function getCommentDetail(commentId: number) {
  const data = await get<CommentRes>(`/api/comments/${commentId}`);

  return data;
}

// 댓글 수정
export async function editComment({
  commentId,
  newComment,
}: {
  commentId: number;
  newComment: CommentReq;
}) {
  const data = await put<CommentRes>(`/api/comments/${commentId}`, newComment);

  return data;
}

// 댓글 삭제
export async function deleteComment(commentId: number) {
  return deleteCall(`/api/comments/${commentId}`);
}

// 특정 유저가 작성한 댓글 목록
export async function getUserComments(userId: number) {
  const data = await get<CommentRes[]>(`/api/users/${userId}/comments`);

  return data;
}

// 특정 레시피에 대한 전체 댓글 목록
export async function getAllComments(recipeId: number) {
  const data = await get<CommentRes[]>(`/api/recipes/${recipeId}/comments`);

  return data;
}
