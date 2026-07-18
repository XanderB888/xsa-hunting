import { useState, useEffect } from 'react';
import api from '../../api/axios.js';
import PostCard from './PostCard.jsx';
import './Feed.css';

let cachedPosts = null;

// cache-clearing function
export function clearFeedCache() {
  cachedPosts = null;
}

function Feed() {
  const [posts, setPosts] = useState(cachedPosts || []);
  const [loading, setLoading] = useState(cachedPosts === null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have posts cached, don't refetch or flash a loading state
    if (cachedPosts !== null) return;

    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        cachedPosts = res.data;      // store for next time
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='feed'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;