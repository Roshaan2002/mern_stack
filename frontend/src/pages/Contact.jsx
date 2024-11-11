import { useState } from "react";
import { useAuth } from "../store/auth";
import React from "react";
import "./css/Contact.css";
import { toast } from "react-toastify";
const URL = "http://localhost:5000/api/form/contact";

const Contact = () => {
  const defaultContactForm = {
    username: "",
    email: "",
    message: "",
  };

  const [contact, setContact] = useState(defaultContactForm);
  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }
  // handle the input value

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handling form submition
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        setContact(defaultContactForm);
        const data = await response.json();
        console.log(data);
        toast.success("Message send successfully");
      }
    } catch (error) {
      toast.error("message not send")
      console.log("contact", error);
    }
  };
  return (
    <>
      <section className="section-contact">
        <main>
          <div className="contact-section">
            <div className="contact-container grid grid-two-cols">
              <div className="contact-image">
                <img src="/images/contact.png" alt="Contact Us" />
              </div>

              {/* contact form content actual */}
              <div className="contact-form">
                <h1 className="main-heading mb-3">Contact Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="username"
                      required
                      autoComplete="off"
                      value={contact.username}
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
                      value={contact.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="10"
                      required
                      value={contact.message}
                      onChange={handleInput}
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <button type="submit" className="btn btn-submit">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Contact;
