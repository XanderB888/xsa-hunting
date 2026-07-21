import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './NavBar.css';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
         <img src="/XSA-logo4.png" alt="XSA Hunting" className="navbar-logo-img" />
         <span className='navbar-logo-text'>XSA Hunting</span>
        </Link>

        {/* Burger button — only visible at ≤425px via CSS */}
        <button
          className="navbar-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Overlay — click to close, only rendered when open */}
      {menuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}

      {/* Drawer: holds links + bottom group. 'open' slides it in at ≤425px */}
      <div className={`navbar-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="navbar-links">
          {user ? ( /*Everything after user ? is only showed when logged in */
            <>
              <Link to="/create" className='navbar-button' onClick={closeMenu}>New Post</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Login</Link>
              <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </div>

        <div className="navbar-bottom">
          <Link to="/about" className="navbar-about-link" onClick={closeMenu}>About Us</Link>
          {user && (
            <>
              <span className="navbar-user">Logged in as {user.username}</span>
              <button onClick={handleLogout} className="navbar-button">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;