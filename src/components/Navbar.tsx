import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { username, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">MovieLogged🟠🟢🔵</div>
      {isAuthenticated && (
        <div className="navbar-links">
          <Link to="/">Popular</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorites">Favorites</Link>
          <span className="navbar-user">Hi, {username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
