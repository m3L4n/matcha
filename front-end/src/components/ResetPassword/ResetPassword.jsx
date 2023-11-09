import React, { useEffect, useState } from "react";
import { notify } from "components/Global/toast-notify";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ResetPassword.scoped.css";
import checkPassword from "../Global/checkPassword";
function ComponentsResendEmailPassword({ email, handleChange, handleReset }) {
  return (
    <div className="container-resetEmail">
      <h1 className="header header-matcha"> MATCHA</h1>
      <p className="body">Enter the email address associated with your account and we’ll send you a link to reset your password.</p>
      <form className="form">
        <input type={"email"} value={email} placeholder="email" onInput={handleChange} className="input" />
        <input type={"submit"} onClick={handleReset} value="send email" className="input-submit body-highlight" />
      </form>
      <Link to="/login" className="link body">
        {" "}
        go back login
      </Link>
    </div>
  );
}

function ComponentsresetPassword({ password, confirmPassword, handleChange, handleResetPassWord }) {
  return (
    <div className="container-resetEmail">
      <h1 className="header header-matcha"> MATCHA</h1>
      <p className="body">Enter your new password.</p>
      <form className="form">
        <input type={"password"} name={"password"} value={password} placeholder="password" onChange={handleChange} className="input" />
        <input type={"password"} name={"confirmPassword"} value={confirmPassword} placeholder="confirm you password" onChange={handleChange} className="input" />
        <input type={"submit"} onClick={handleResetPassWord} value="send email" className="input-submit body-highlight" />
      </form>
      <Link to="/login" className="link body">
        {" "}
        go back login
      </Link>
    </div>
  );
}

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(1); // 1 = send email reste password // 0 = change password
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const res = useParams();

  useEffect(() => {
    if (Object.keys(res).length > 0) {
      setSendEmail(0);
    } else {
      setSendEmail(1);
    }
  }, [res]);

  async function handleChange(event) {
    setEmail(event.target.value);
  }
  function handleChangePassWord(event) {
    setPassword({ ...password, [event.target.name]: event.target.value });
  }

  async function handleReset(e) {
    e.preventDefault();
    if (email.length == 0) {
      notify("warning", " you have to fill with your email adress");
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify({ email: email }),
    };
    fetch("http://localhost:4000/users/send-password-reset", options)
      .then((response) => {
        if (response.status == 404) {
          notify("error", "email doesnt match");
          return response.json();
        } else if (response.status == 200) {
          notify("success", "check your email");
          return response.json();
        }
        return response.json();
      })
      .catch(() => {
        notify("error", "email doesnt match");
      });
  }

  function handleResetPassword(event) {
    event.preventDefault();
    if (password.password.length == 0 || password.confirmPassword.length == 0) {
      notify("error", "you cant submit this, you have to fill the passwords input");
      return;
    }
    if (password.password != password.confirmPassword) {
      notify("error", "password are different, please re fille the input with same password");
      return;
    }
    if (!checkPassword(password.password) || !checkPassword(password.confirmPassword)) {
      notify("error", "password doesn't respect the password security");
      return;
    }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: res.id,
        password: password.password,
      }),
    };
    fetch("http://localhost:4000/users/changePassword", options)
      .then((response) => {
        if (response.status == 200) {
          notify("success", "your password are successfully changed");
          setPassword({
            password: "",
            confirmPassword: "",
          });
        } else if (response.status == 500) {
          notify("error", "cant update password now, but you can contact us or retry later ");
        }
        return response.json();
      })
      .then(() => {})
      .catch((error) => {
        return error;
      });
  }

  return (
    <div className="container">
      {!sendEmail && (
        <ComponentsresetPassword password={password.password} confirmPassword={password.confirmPassword} handleChange={handleChangePassWord} handleResetPassWord={handleResetPassword} />
      )}
      {sendEmail && <ComponentsResendEmailPassword email={email} handleChange={handleChange} handleReset={handleReset} />}
    </div>
  );
}
