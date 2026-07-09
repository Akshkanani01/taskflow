import CommentItem from "./comment-item";

interface Props {
  comments: any[];
  currentUserId: string;
}

export default function CommentList({
  comments,
  currentUserId,
}: Props) {
  if (comments.length === 0) {
    return (
      <div className="py-10 text-center text-slate-500">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {comments.map(
        (comment) => (
          <CommentItem
    id={comment.id}
    name={comment.user.name ?? "Unknown"}
    image={comment.user.image}
    content={comment.content}
    createdAt={comment.createdAt.toLocaleString()}
/>
        )
      )}

    </div>
  );
}