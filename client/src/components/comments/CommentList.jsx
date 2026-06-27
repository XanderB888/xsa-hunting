import CommentItem from './CommentItem.jsx';

function CommentList({ comments }) {
  return (
    <div>
      <h3>Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;