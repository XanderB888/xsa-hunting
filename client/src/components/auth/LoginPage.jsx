import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import './Auth.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
      setSubmitting(false);
    }
  };

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit} className='auth-form'>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={submitting}>{submitting ? 'Logging in...' : 'Log In'}</button>
          <p className='auth-switch'>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;