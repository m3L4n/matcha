import React from "react";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { notify } from "../../Global/toast-notify";
import { isValidEmail } from "src/components/Global/check-email";

import "./Register.scoped.css";
import checkPassword from "src/components/Global/checkPassword";
export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const addInputError = (id, bool) => {
    const input = document.getElementById(id);
    if (input) {
      if (bool) {
        input.classList.add("input-error");
      } else {
        input.classList.remove("input-error");
      }
    }
  };

  function handleFormSignIn(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name == "email") {
      if (!isValidEmail(value)) {
        addInputError(name, true);
      } else {
        addInputError(name, false);
      }
    } else if (name == "username") {
      if (value.length > 20) {
        addInputError(name, true);
      } else {
        addInputError(name, false);
      }
    } else if (name == "password") {
      if (!checkPassword(value)) {
        addInputError(name, true);
      } else {
        addInputError(name, false);
      }
    }
    setUser({ ...user, [name]: value });
  }
  function redirectionToSignIn() {
    navigate("/login");
  }
  function creationOfUser() {
    if (!isValidEmail(user.email)) {
      notify("error", "you have to enter a good email ");
      return;
    }
    if (!checkPassword(user.password)) {
      notify("error", "you password have to have one or more Capslock, number operator specific ");
      return;
    }
    if (user.username.length > 20) {
      notify("error", "you username have to be less than 20 character");
      return;
    }
    if (user.username.length == 0 || user.password.length == 0 || user.firstName.length == 0 || user.lastName.length == 0 || user.email.length == 0) {
      notify("error", "you have to fill all the parameter");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:4000/users", options)
      .then((response) => {
        if (response.status == 404) {
          notify("error", "email or username already in use");
        }
        if (response.status == 201) {
          notify("success", "your account is created, please verify your email");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status == 404) {
          notify("error", data.msg);
          return;
        } else if (data.status == 400) {
          notify("error", data.msg);
          return;
        }
      })
      .catch((error) => {
        notify("error", error.msg);
        return;
      });
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
          <label className="label body" htmlFor="username">
            {" "}
            Username
          </label>
          <input className="input" id="username" name="username" type="text" onChange={handleFormSignIn} value={user.username} />
          <label className="label body" id="firstName">
            {" "}
            first name
          </label>
          <input className="input" id="firstName" name="firstName" type="text" onChange={handleFormSignIn} value={user.firstName} />
          <label className="label body" htmlFor="lastName">
            {" "}
            last name
          </label>
          <input className="input" name="lastName" id="lastName" type="text" onChange={handleFormSignIn} value={user.lastName} />
          <label className="label body" htmlFor="email">
            {" "}
            email
          </label>
          <input className="input" id="email" name="email" type="email" onChange={handleFormSignIn} value={user.email} />
          <label className="label body" htmlFor="password">
            {" "}
            password
          </label>
          <input className="input" name="password" id="password" type="password" onChange={handleFormSignIn} value={user.password} />
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
