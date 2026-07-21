import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignupPage from './components/auth/SignupPage';
import LoginPage from './components/auth/LoginPage';
import Feed from './components/feed/Feed';
import PostDetail from './components/post/PostDetail';
import CreatePostForm from './components/createPost/CreatePostForm';
import ProtectedRoute from './components/routes/ProtectedRoute.jsx';
import AboutUs from './components/about/AboutUs.jsx';

function App() {
    return (
        <>
            <div className="app-layout">
                <NavBar />
                <main className="app-content">
                    <Routes>
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Feed />
                            </ProtectedRoute>} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/posts/:id" element={
                            <ProtectedRoute>
                                <PostDetail />
                            </ProtectedRoute>} />
                        <Route path="/create" element={
                            <ProtectedRoute>
                                <CreatePostForm />
                            </ProtectedRoute>} />
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default App;