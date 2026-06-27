import { useParams } from 'react-router-dom';
import { mockPosts } from '../../mockData.js';
import ShotPlacementPanel from './ShotPlacementPanel.jsx';
import FirearmInfo from './FirearmInfo.jsx';
import CommentList from '../comments/CommentList.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useState } from 'react';
import CommentForm from '../comments/CommentForm.jsx';

function PostDetail() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === Number(id));
  const { user } = useAuth();
  const isOwner = user && user.username === post.username;

  const handleDelete = () => {
    console.log('Delete post', post.id);
  }; // This is for testing, real Deleteing will be implemented later

  const [comments, setComments] = useState(post ? post.comments : []);

  const addComment = (text) => {
    const newComment = {
      id: Date.now(),
      username: user ? user.username : 'Anonymous',
      text: text,
    };
    setComments([...comments, newComment]);
  };

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
      <FirearmInfo firearm={post.firearm} />
      <CommentList comments={comments} />
      <CommentForm onAddComment={addComment} />
      {isOwner && (
        <button onClick={handleDelete}>Delete this post</button>
      )}
    </div>
  );
}

export default PostDetail;