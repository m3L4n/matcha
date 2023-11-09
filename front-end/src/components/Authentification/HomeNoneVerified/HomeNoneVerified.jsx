import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { notify } from "../../Global/toast-notify";
import "./HomeNoneVerified.scoped.css";
export default function HomeNoneVerified() {
  const { state } = useLocation();
  const navigate = useNavigate();
  let count = 0;

  useEffect(() => {
    if (count == 0) {
      verifyData();
    }
    count = 1;
  }, []);

  function verifyData() {
    if (!state?.datae) {
      notify("error", "you have to be connected to see this page");
      navigate("/login");
      return;
    }
  }
  function resendEmail() {
    const username = state.datae;
    const objToSend = { username: username };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify(objToSend)
    };
    fetch("http://localhost:4000/users/send-email-verification", options)
      .then(response => {
        if (response.status == 200) {
          notify(
            "success",
            "check your email, your link will be send in the second"
          );

        }
        if (response.status == 404){
          notify(
            "erorr",
            "email are not in the db"
          );
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(() => {
        notify("error", "we can't send email for the moment, please retry");
      });
  }

  return (
    <div className="container">
      <div className="body-sendEmail">
        <h1 className="header header-matcha"> MATCHA</h1>
        <p className="title-2"> You have to validate your email </p>
        <button onClick={resendEmail} className="button-resend title-1">
          {" "}
          resend email
        </button>
        <Link to="/login" className="link body">
          {" "}
          go back login
        </Link>
      </div>
    </div>
  );
}
