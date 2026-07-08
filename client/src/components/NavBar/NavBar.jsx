import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './NavBar.css';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo">XSA Hunting</Link>
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/create">New Post</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {user && (
        <div className="navbar-bottom">
          <span className="navbar-user">Logged in as {user.username}</span>
          <button onClick={handleLogout} className="navbar-button">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;