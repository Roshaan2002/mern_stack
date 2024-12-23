import React from "react";
import Analytics from "../components/Analytics";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the best IT Company</p>
              <h1>Welcome to Roshaan Mern Application</h1>
              <p>
                Are you ready to take your business to nest level with
                cutting-edge IT solution? look no further! At RoshaanMern, we
                specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <Link to="/contact">
                  <button className="btn">Connect Now</button>
                </Link>
                <Link to="/service">
                  <button className="btn">Learn More</button>
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/network.png"
                alt="this is my hero section image"
                width="390"
                height="270"
              />
            </div>
          </div>
        </section>
      </main>
      {/* 2nd section  */}
      <Analytics />
    </>
  );
};

export default Home;
