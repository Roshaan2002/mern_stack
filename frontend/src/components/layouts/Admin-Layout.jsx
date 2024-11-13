import React, { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="admin-layout">
      <div className="admin-menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <nav className={`admin-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/admin/users" onClick={() => setMenuOpen(false)}>
              <FaUser /> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/contacts" onClick={() => setMenuOpen(false)}>
              <FaMessage /> Contacts
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/services" onClick={() => setMenuOpen(false)}>
              <FaRegListAlt /> Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              <FaHome /> Home
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
