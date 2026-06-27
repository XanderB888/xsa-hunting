import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignupPage from './components/auth/SignupPage';
import LoginPage from './components/auth/LoginPage';
import Feed from './components/feed/Feed';
import PostDetail from './components/post/PostDetail';
import CreatePostForm from './components/createPost/CreatePostForm';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/create" element={<CreatePostForm />} />
            </Routes>
        </>
    );
}

export default App;