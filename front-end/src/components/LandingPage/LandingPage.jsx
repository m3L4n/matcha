import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scoped.css";
export default function LandingPage() {
  const navigate = useNavigate();

  function redirectionToRegister() {
    navigate("/register");
  }
  function redirectionToSignIn() {
    navigate("/login");
  }

  function AboutUs() {
    return (
      <article className="aboutUs">
        <h1 className="title-2 aboutUs-title">
          💖 Discover Love, Differently. 💖
        </h1>
        <article></article>
        <article className="">
          <h3 className="title-1"> 🌟 Gender Equality 🌟</h3>
          <p className="body">
            {
              "We believe in complete gender equality, ensuring that everyone is treated with respect and fairness. women and men have equal rights and opportunities to find their soulmate."
            }
          </p>
        </article>
        <article className="body">
          <h3 className="title-1"> 🌱 Eco-Friendly Commitment 🌱</h3>
          <p className="body">
            {
              "Our planet is precious, which is why we're dedicated to reducing our carbon footprint"
            }{" "}
            <br />
          </p>
        </article>
        <article className="">
          <h3 className="title-1"> 🔒 Safety and Privacy 🔒</h3>
          <p className="body">
            {
              "Your safety is our top priority. We employ cutting-edge technology to safeguard your personal data and conversations, allowing you to focus on building real, sincere connections."
            }{" "}
            <br />
          </p>
        </article>
        <p className="body">
          {" Join us and let's build a more equal and greener future. 💚🌍"}
        </p>
      </article>
    );
  }
  return (
    <div className="landingPage">
      <div className="landingPage__body">
        <div className="header-vertical">
          <div className="image-left">
            <div className="matcha-left passion-one"> MATCHA</div>
          </div>
          <div className="matcha-after-img">
            <div className="matcha-right passion-one"> MATCHA</div>
          </div>
        </div>
        <div className="body-landing-page">
          <header className="landingPage__header">
            <button
              className="landingPage__header-button body"
              onClick={redirectionToRegister}
            >
              {" "}
              Sign in
            </button>
            <button
              className="landingPage__header-button body"
              onClick={redirectionToSignIn}
            >
              {" "}
              Sign up{" "}
            </button>
          </header>
          <div className="center-landing-page">
            <p className="header"> MATCHA</p>
            <p className="title-2"> Date at your favorite coffee shop !</p>
            <button
              className="title-1 button-action"
              onClick={redirectionToRegister}
            >
              {" "}
              Start dating now !
            </button>
          </div>
          <div className="container-image-absolute-left" />
          {/* <div className='landingPage_image-bottom'> </div> */}
          {/* <div className='container-image-absolute-bottom'/> */}
        </div>
      </div>
      <hr className="landingPage-hr" />
      <AboutUs />

      <div className="landingPage__scroll">
        <div className="landingPage__scroll-text body"> scroll</div>
      </div>
    </div>
  );
}
