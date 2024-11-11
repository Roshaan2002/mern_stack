import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("contact data", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Move deleteContactById to the component level
  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        // Remove the deleted contact from the contactData state
        setContactData((prevData) => prevData.filter((contact) => contact._id !== id));
        toast.success("Message Deleted");
      } else {
        toast.error("Not Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactData();
  }, []);

  return (
    <>
      <section className="admin-user-section">
        <div className="container">
          <h1>Admin Contact Data</h1>
        </div>
        <div className="container admin-user">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((curContact, index) => {
                const { username, email, message, _id } = curContact;
                return (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{message}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteContactById(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminContacts;
