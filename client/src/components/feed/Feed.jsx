import { mockPosts } from '../../mockData.js';
import PostCard from './PostCard.jsx';

function Feed() {
  return (
    <div>
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;