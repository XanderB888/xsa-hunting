import { render, screen } from '@testing-library/react';
import CommentItem from './CommentItem.jsx';
import '@testing-library/jest-dom';

describe('CommentItem', () => {
  it('displays the comment username and text', () => {
    const comment = { id: 1, username: 'Xander', text: 'Great shot!' };

    render(<CommentItem comment={comment} />);

    expect(screen.getByText('Xander')).toBeInTheDocument();
    expect(screen.getByText(/Great shot!/)).toBeInTheDocument();
  });
});