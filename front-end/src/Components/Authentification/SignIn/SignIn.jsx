// import React from 'react'
import { useState } from "react";
import { FaDiscord } from "react-icons/fa6";
import "./SignIn.scoped.css"
export default function SignIn() {

  const [user, setUser] = useState({
    username: "",
    password: "",
})

  function handleChange(event){
    setUser({...user, [event.target.name] : event.target.value})
  }

  function signIn(){
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(user)
    };
    fetch("http://localhost:4000/users/login", options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => console.log(error));
}

  return (
    <div className="container">
      <div className="container-auth">
        <header className='header header'> SIGN IN
          <p className="title-1"> And start dating !</p>
          <button className="button-discord title-1"> 
            <span>
            Connect with discord
            </span>
            <FaDiscord/></button>
        </header>
        <hr className="hr"/>
        <div className="container-form">
          <label className="label body"> Username
          </label>
          <input className="input" name="username" type="text" value={user.username}  onChange={handleChange}/>
          <label  className="label body"  > password
          </label>
          <input className="input" name="password" type="password" value={user.password} onChange={handleChange} />
        </div>
        <button className="button-submit title-1" onClick={signIn}> Signin</button>
        <button className="login body" > Forgot your password ? <br/> Reset</button>
      </div>
      <div className="container-img">
        <div className="img-right"></div>
      </div>
    </div>)
}
