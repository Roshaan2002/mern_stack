import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <div className="admin-layout">
      <nav className="admin-nav">
        <ul>
          <li>
            <NavLink to="/admin/users">
              <FaUser /> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/contacts">
              <FaMessage /> Contacts
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/services">
              <FaRegListAlt /> Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default AdminLayout;
