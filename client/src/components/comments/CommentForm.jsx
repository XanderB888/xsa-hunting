import { useState } from 'react';

function CommentForm({ onAddComment }) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // ignore empty comments
    if (submitting) return;
    setSubmitting(true);

    try {
      await onAddComment(text); // call the parent's function
      setText(''); // clear the input after submitting
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);       // always unlock — user stays on the page
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" disabled={submitting}>{submitting ? 'Posting...' : 'Post'}</button>
    </form>
  );
}

export default CommentForm;