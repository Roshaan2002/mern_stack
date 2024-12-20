import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn, user, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <header className={menuOpen ? "nav-active" : ""}>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">RoshaanMern</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/" onClick={toggleMenu}>
                  Home
                </NavLink>
              </li>
              {/* Only display Admin link if user is admin */}
              {user?.isAdmin && (
                <li>
                  <NavLink to="/admin" onClick={toggleMenu}>
                    Admin
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/about" onClick={toggleMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/chat" onClick={toggleMenu}>
                  Chat
                </NavLink>
              </li>
              <li>
                <NavLink to="/service" onClick={toggleMenu}>
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={toggleMenu}>
                  Contact
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout" onClick={toggleMenu}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register" onClick={toggleMenu}>
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" onClick={toggleMenu}>
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
