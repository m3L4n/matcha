import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Register from "./Register/Register";
import SignIn from "./SignIn/SignIn";
export default function Authentification() {
  const [register, setRegister] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    if (location === "/login") {
      setRegister(false);
    } else if (location === "/register") {
      setRegister(true);
    }
  }, [location]);

  return (
    <>
      {register && <Register />}
      {!register && <SignIn />}
    </>
  );
}
