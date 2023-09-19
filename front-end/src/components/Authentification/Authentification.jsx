import React from "react";
import { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import AuthCss from "./Authentification.scoped.css";
import Register from "./Register/Register";
import SignIn from "./SignIn/SignIn";
export default function Authentification() {
  const [register, setRegister] = useState(false);
  const location = useLocation().pathname;
  useEffect(() => {
    if (location === "/register") {
      setRegister(false);
    } else if (location === "/login") {
      setRegister(true);
    }
  }, [location]);

  return (
    <>
      {!register && <Register />}
      {register && <SignIn />}
    </>
  );
}
