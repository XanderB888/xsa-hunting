import { Link } from 'react-router-dom';
import './PostCard.css';
import { HeartIcon, CommentIcon } from '../icons/Icons.jsx';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <p className="post-card-username">{post.username}</p>
      <img src={post.photo} alt={post.species} className="post-card-image" />
      <div className="post-card-body">
        
        <p className="post-card-caption">
          <span className='post-card-caption-label'>Journal ~ </span> {post.caption}
        </p>
        <div className="post-card-meta">
          <span>{post.species}</span>
          <span><CommentIcon className="icon comment-icon" /> {post.comment_count}</span>
          <span><HeartIcon filled={post.liked_by_me} className={`icon like-icon ${post.liked_by_me ? 'liked' : ''}`} /> {post.like_count}</span>
        </div>
        <Link to={`/posts/${post.id}`} className="post-card-link">View post →</Link>
      </div>
    </div>
  );
}

export default PostCard;

