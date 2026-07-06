import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PostCard from './PostCard.jsx';

describe('PostCard', () => {
  it('displays the post details and comment count', () => {
    const post = {
      id: 1,
      username: 'Xander',
      caption: 'What a walk and stalk',
      species: 'Impala',
      photo: 'https://placehold.co/600x400',
      comment_count: '2',
      like_count: '5',
    };

    render(
      <MemoryRouter>
        <PostCard post={post} />
      </MemoryRouter>
    );

    expect(screen.getByText('Xander')).toBeInTheDocument();
    expect(screen.getByText('Impala')).toBeInTheDocument();
    expect(screen.getByText(/What a walk and stalk/)).toBeInTheDocument();
  });
});