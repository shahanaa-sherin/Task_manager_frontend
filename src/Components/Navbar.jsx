/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Task Manager</div>
      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-white mx-2">Login</Link>
            <Link to="/signup" className="text-white mx-2">Sign Up</Link>
          </>
        ) : (
          <button onClick={onLogout} className="text-white mx-2">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
