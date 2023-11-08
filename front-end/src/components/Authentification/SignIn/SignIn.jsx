import { useState } from "react";
import "./SignIn.scoped.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { notify } from "components/Global/toast-notify";
import { useAuth } from "src/Context/AuthContext";
import { socket } from "src/socket/socket";
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
          // navigate("/match");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status == 201) {
          socket.emit("login", { userId: data.userId });
          socket.emit("login-reload", { userId: data.userId });
        }
        if (data.status == 403) {
          notify("warning", data.msg);
          return;
        } else if (data.status == 401) {
          notify("warning", "please verify your email we send you a mail to verify your email");
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
          <div className="button-discord title-1">
            <span>Find love</span>
          </div>
        </header>
        <hr className="hr" />
        <div className="container-form">
          <label className="label body" htmlFor="username">
            {" "}
            Username
          </label>
          <input className="input" name="username" id="username" type="text" value={user.username} onChange={handleChange} />
          <label className="label body" htmlFor="password">
            {" "}
            password
          </label>
          <input className="input" name="password" id="password" type="password" value={user.password} onChange={handleChange} />
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
