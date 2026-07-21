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
        <Link to="/" className="navbar-logo">
         <img src="/XSA-logo4.png" alt="XSA Hunting" className="navbar-logo-img" />
         <span className='navbar-logo-text'>XSA Hunting</span>
        </Link>
        <div className="navbar-links">
          {user ? ( /*Everything after user ? is only showed when logged in */
            <>
              <Link to="/create" className='navbar-button'>New Post</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <div className="navbar-bottom">
        <Link to="/about" className="navbar-about-link">About Us</Link>
        {user && (
          <>
            <span className="navbar-user">Logged in as {user.username}</span>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;