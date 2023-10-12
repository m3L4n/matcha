// import React from 'react'
import { useState } from "react";
import { FaDiscord } from "react-icons/fa6";
import "./SignIn.scoped.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { notify } from "components/Global/toast-notify";
import { useAuth } from "src/Context/AuthContext";
export default function SignIn() {
  const navigate = useNavigate();
  const { setTriggerReload } = useAuth();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function signIn() {
    if (user.username.length == 0 || user.password.length == 0) {
      notify("error", "you have to put a username and password");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    };
    fetch("http://localhost:4000/users/login", options)
      .then((response) => {
        if (response.status == 201) {
          notify("success", "login success");
          setTriggerReload(true);
          navigate("/match");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data request :", data);
        if (data.msg == "Authentication failed") {
          notify("warning", "please sign up , we cant match username and password");
        } else if (data.msg === "user not verified") {
          notify("warning", "please verify your email  we send you a mail to verify your email");
          navigate("/reset", { state: { datae: user.username } });
          return;
        }
      })
      .catch((error) => notify("error", error));
  }

  return (
    <div className="container">
      <div className="container-auth">
        <header className="header header">
          SIGN IN
          <p className="title-1"> And start dating !</p>
          <button className="button-discord title-1">
            <span>Connect with discord</span>
            <FaDiscord />
          </button>
        </header>
        <hr className="hr" />
        <div className="container-form">
          <label className="label body"> Username</label>
          <input className="input" name="username" type="text" value={user.username} onChange={handleChange} />
          <label className="label body"> password</label>
          <input className="input" name="password" type="password" value={user.password} onChange={handleChange} />
        </div>
        <button className="button-submit title-1" onClick={signIn}>
          {" "}
          Signin
        </button>
        <Link to="/reset-password" className="body link">
          {" "}
          Forgot your password ? <br /> Reset
        </Link>
      </div>
      <div className="container-img">
        <div className="img-right"></div>
      </div>
    </div>
  );
}
