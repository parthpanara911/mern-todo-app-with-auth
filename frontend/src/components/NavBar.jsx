import { Link } from "react-router-dom";
import "../style/navbar.css";
import { useAuth } from "../hooks/useAuth.js";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo"><a href="/">To Do App</a></div>
      <ul className="nav-links">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to="/add">Add Todo</Link>
            </li>
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;