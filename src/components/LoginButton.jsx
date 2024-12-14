// src/components/LoginButton.jsx
import { useAuth } from '../auth/AuthContext';

export const LoginButton = () => {
  const { isAuthenticated, login, logout, loading, user } = useAuth();

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  };

  if (loading) {
    return <button disabled>Loading...</button>;
  }

  return (
    <div>
      <button onClick={handleAuth}>
        {isAuthenticated ? 'Logout' : 'Login with Microsoft'}
      </button>
      {isAuthenticated && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};