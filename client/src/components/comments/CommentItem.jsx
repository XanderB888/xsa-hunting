function CommentItem({ comment }) {
  return (
    <div>
      <strong>{comment.username}</strong>: {comment.text}
    </div>
  );
}

export default CommentItem;