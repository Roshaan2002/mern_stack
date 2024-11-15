import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();

  // Get single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`, // Fixed backticks
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json(); // Added `await`
      console.log(`User single data: ${JSON.stringify(data)}`);
      setData(data);
    } catch (error) {
      console.log("Error fetching single user data:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`, // Fixed backticks
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        navigate('/admin/users');
        toast.success("User updated");
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <section className="section-update">
      <main>
        <div className="user-update">
          <div className="user-update-form">
            <h1 className="main-heading">Admin Update User</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="phone">Mobile</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  required
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-submits">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AdminUpdate;