import CommentForm from "./comment-form";
import CommentItem from "./comment-item";

type Comment = {
  id: string;
  content: string;
  createdAt: Date;

  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type Props = {
  taskId: string;
  comments: Comment[];
};

export default function CommentsSection({
  taskId,
  
  comments,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Add Comment */}

      <CommentForm
        taskId={taskId}
        
      />

      {/* List */}

      {comments.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950 py-12 text-center">

          <h3 className="text-lg font-medium text-white">
            No comments yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Start the discussion by writing the first comment.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {comments.map((comment) => (

            <CommentItem
  key={comment.id}
  id={comment.id}
  name={
    comment.user.name ??
    "Unknown User"
  }
  image={comment.user.image}
  content={comment.content}
  createdAt={comment.createdAt.toISOString()}
/>

          ))}

        </div>

      )}

    </div>
  );
}