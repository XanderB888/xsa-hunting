import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div>
      <img src={post.photo} alt={post.species} />
      <p>{post.username}</p>
      <p>{post.caption}</p>
      <p>{post.species}</p>
      <p>{post.comment_count} comments</p>
      <p style={{ backgroundColor: post.liked_by_me ? 'lightblue' : 'gray' }}>💖 {post.like_count}</p>
      <Link to={`/posts/${post.id}`}>View post</Link>
    </div>
  );
}

export default PostCard;