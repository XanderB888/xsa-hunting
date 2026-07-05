import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import ShotPlacementPanel from './ShotPlacementPanel.jsx';
import FirearmInfo from './FirearmInfo.jsx';
import CommentList from '../comments/CommentList.jsx';
import CommentForm from '../comments/CommentForm.jsx';

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
        setComments(res.data.comments);
      } catch (err) {
        console.error(err);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const addComment = async (text) => {
    try {
      const res = await api.post(`/posts/${id}/comments`, { text });
      setComments([...comments, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;

  const isOwner = user && user.username === post.username;

  return (
    <div>
      <h2>{post.species} — {post.sex}</h2>
      <img src={post.photo} alt={post.species} />
      <p>{post.username}</p>
      <p>{post.caption}</p>
      <p>Location: {post.location}</p>
      <p>Distance: {post.distance}m</p>

      <ShotPlacementPanel shot={post} />
      <FirearmInfo firearm={post} />

      <CommentList comments={comments} />
      <CommentForm onAddComment={addComment} />

      {isOwner && (
        <button onClick={handleDelete}>Delete this post</button>
      )}
    </div>
  );
}

export default PostDetail;