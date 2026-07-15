import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext.jsx';

function DashboardPage() {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Logged in as: {user.email}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;