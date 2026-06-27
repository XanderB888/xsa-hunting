import { useParams } from 'react-router-dom';
import { mockPosts } from '../../mockData.js';
import ShotPlacementPanel from './ShotPlacementPanel.jsx';

function PostDetail() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>{post.species} — {post.sex}</h2>
      <img src={post.photo} alt={post.species} />
      <p>{post.username}</p>
      <p>{post.caption}</p>
      <p>Location: {post.location}</p>
      <p>Distance: {post.distance}m</p>

      <ShotPlacementPanel shot={post.shotPlacement} />
    </div>
  );
}

export default PostDetail;