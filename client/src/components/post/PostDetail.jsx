import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import ShotPlacementPanel from './ShotPlacementPanel.jsx';
import FirearmInfo from './FirearmInfo.jsx';
import CommentList from '../comments/CommentList.jsx';
import CommentForm from '../comments/CommentForm.jsx';
import './PostDetail.css';
import { clearFeedCache, updateCachedPost } from '../feed/Feed.jsx';

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
      const newComments = [...comments, res.data];
      setComments(newComments);
      updateCachedPost(post.id, { comment_count: newComments.length });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      clearFeedCache();      // ← add this
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  };

  const handleLike = async () => {
    try {
      const res = await api.patch(`/posts/${id}/like`);
      setPost({ ...post, like_count: res.data.like_count, liked_by_me: res.data.liked_by_me });
      updateCachedPost(post.id, {
        like_count: res.data.like_count,
        liked_by_me: res.data.liked_by_me,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;

  const isOwner = user && user.username === post.username;

  return (
    <div className="post-detail">
      <button className='back-button' onClick={() => navigate(-1)}>
         Back to feed
      </button>
      <div className="post-detail-grid">

        {/* LEFT column — hunt details + firearm + conditions */}
        <div className="post-detail-left">
          <div className="post-detail-section">
            <h3 className="section-heading">Hunt Details</h3>
            <div className="conditions-bubble">
              <p><strong>Location:</strong> {post.location}</p>
              <p><strong>Shot Distance:</strong> {post.distance}m</p>
            </div>
          </div>
          <div className="post-detail-section">
            <FirearmInfo firearm={post} />
          </div>
          <div className="post-detail-section">
            <h3 className="section-heading">Conditions</h3>
            <div className="conditions-bubble">
              <p><strong>Time:</strong> {post.time_of_day}</p>
              <p><strong>Wind:</strong> {post.wind}</p>
              <p><strong>Weather:</strong> {post.weather}</p>
            </div>
          </div>
        </div>

        {/* CENTER column — title, photo, meta, shot placement */}
        <div className="post-detail-center">
          <h2 className="post-detail-title">{post.species} — {post.sex}</h2>
          <p className="post-detail-author">Posted by <strong>{post.username}</strong></p>
          <img src={post.photo} alt={post.species} className="post-detail-image" />

          <div className="post-detail-shot">
            <ShotPlacementPanel shot={post} />
          </div>

          <div className="post-detail-actions">
            <button
              onClick={handleLike}
              className="like-button"
              style={{ backgroundColor: post.liked_by_me ? 'var(--primary)' : 'var(--border)' }}
            >
              💖 {post.like_count}
            </button>
            {isOwner && (
              <button onClick={handleDelete} className="delete-button">
                Delete this post
              </button>
            )}
          </div>
        </div>

        {/* RIGHT column — comments */}
        <div className="post-detail-right">
          <div className="journal-block">
            <h3 className="section-heading">Journal</h3>
            <p className="post-card-caption">{post.caption}</p>
          </div>

          <h3 className="section-heading">Comments</h3>
          <CommentList comments={comments} />
          <CommentForm onAddComment={addComment} />
        </div>

      </div>
    </div>
  );
}

export default PostDetail;