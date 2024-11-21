import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import Analytics from "../components/Analytics";

const About = () => {
  const { user } = useAuth();
  return (
    <>
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <h2 className="welcome-user">Welcome, {user ? user.username : `to our website`}</h2>
            <h1>Why Choose Us?</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique adipisci numquam, quasi blanditiis sint corrupti est
              facilis expedita natus nihil.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique adipisci numquam, quasi blanditiis sint corrupti est
              facilis expedita natus nihil.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique adipisci numquam, quasi blanditiis sint corrupti est
              facilis expedita natus nihil.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique adipisci numquam, quasi blanditiis sint corrupti est
              facilis expedita natus nihil.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique adipisci numquam, quasi blanditiis sint corrupti est
              facilis expedita natus nihil.
            </p>
            <div className="btn btn-group">
              <Link to="/contact">
                <button className="btn">Connect Now</button>
              </Link>
              <Link to="/service">
                <button className="btn">Learn more</button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/home2.png" alt="about us" />
          </div>
        </div>
      </section>

      <Analytics />
    </>
  );
};

export default About;
