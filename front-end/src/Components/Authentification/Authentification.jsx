import React from "react";
import { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import  AuthCss from "./Authentification.scoped.css"
import Register from "./Register/Register";
import SignIn from "./SignIn/SignIn";
export default function Authentification() {
  const [register, setRegister] = useState(false);
  useEffect(() => {
    if (window.location.pathname === "/register"){
      setRegister(true);
    }
    else if(window.location.pathname === "/login"){
      setRegister(false);
    }
  }, [window.location.pathname])
 
  return(
    <>
  {register && <Register/>}
  {!register && <SignIn/>}
  </>
    )
}
