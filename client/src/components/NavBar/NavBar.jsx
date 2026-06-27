import { useAuth } from '../../context/AuthContext.jsx';

function NavBar() {
  const { user } = useAuth();

  return (
    <div>
      NavBar — {user ? 'logged in' : 'logged out'}
    </div>
  );
}

export default NavBar;