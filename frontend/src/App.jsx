import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import Service from "./pages/Service";
import Error from "./pages/Error";
import Footer from "./components/Footer/Footer";
import AdminLayout from "./components/layouts/Admin-Layout";
import AdminUsers from "./pages/Admin-Users";
import AdminContacts from "./pages/Admin-Contacts";
import AdminServices from "./pages/Admin-Services";
import EditService from "./pages/Edit-service";
import AdminUpdate from "./pages/Admin-Update";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />\
          <Route path="/chat" element={<Chat />} />\
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
            <Route path="services/edit/:id" element={<EditService />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="services" element={<AdminServices />} />
          </Route>
        </Routes>
        <div id="root" style={{ height: "50vh" }}>
          <div className="main-content"></div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
