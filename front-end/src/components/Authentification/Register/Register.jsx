import React from "react";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { notify } from "../../Global/toast-notify";
import "./Register.scoped.css";
export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  function handleFormSignIn(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  function redirectionToSignIn() {
    navigate("/login");
  }
  function creationOfUser() {
    if (
      user.username.length == 0 ||
      user.password.length == 0 ||
      user.firstName.length == 0 ||
      user.lastName.length == 0 ||
      user.email.length == 0
    ) {
      notify("error", "you have to fill all the parameter");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    };
    fetch("http://localhost:4000/users", options)
      .then(response => {
        if (response.status == 201) {
          notify("success", "your acount is created, please verify your email");
        }
        return response.json();
      })
      .then(data => {
        if (data.msg == "token not created") {
          notify(
            "error",
            "please retry later, a error appear and we are on this work"
          );
        } else if (data.msg == 'Details are not correct"') {
          notify(
            "error",
            "email or username are already token , please retry with another "
          );
        }
      })
      .catch(error => console.log(error));
  }
  return (
    <div className="container">
      <div className="container-auth">
        <header className="header header">
          {" "}
          SIGN UP
          <p className="title-1"> And start dating !</p>
          <button className="button-discord title-1">
            {" "}
            <span>Connect with discord</span>
            <FaDiscord />
          </button>
        </header>
        <hr className="hr" />
        <form className="container-form">
          <label className="label body"> Username</label>
          <input
            className="input"
            name="username"
            type="text"
            onChange={handleFormSignIn}
            value={user.username}
          />
          <label className="label body"> first name</label>
          <input
            className="input"
            name="firstName"
            type="text"
            onChange={handleFormSignIn}
            value={user.firstName}
          />
          <label className="label body"> last name</label>
          <input
            className="input"
            name="lastName"
            type="text"
            onChange={handleFormSignIn}
            value={user.lastName}
          />
          <label className="label body"> email</label>
          <input
            className="input"
            name="email"
            type="email"
            onChange={handleFormSignIn}
            value={user.email}
          />
          <label className="label body"> password</label>
          <input
            className="input"
            name="password"
            type="password"
            onChange={handleFormSignIn}
            value={user.password}
          />
        </form>
        <button className="button-submit title-1" onClick={creationOfUser}>
          {" "}
          Signup
        </button>
        <button className="login body" onClick={redirectionToSignIn}>
          {" "}
          Already have an account ?<br /> Login
        </button>
      </div>
      <div className="container-img">
        <div className="img-right"></div>
      </div>
    </div>
  );
}
