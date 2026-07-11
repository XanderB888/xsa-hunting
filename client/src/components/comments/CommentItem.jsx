import './Comments.css';

function CommentItem({ comment }) {
  return (
    <div className="comment-item">
      <div className="comment-username">{comment.username}</div>
      <div className="comment-text">{comment.text}</div>
    </div>
  );
}

export default CommentItem;