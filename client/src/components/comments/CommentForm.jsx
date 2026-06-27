import { useState } from 'react';

function CommentForm({ onAddComment }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // ignore empty comments
    onAddComment(text); // call the parent's function
    setText(''); // clear the input after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Post comment</button>
    </form>
  );
}

export default CommentForm;