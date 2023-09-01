import React from "react";
import { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import  "./Register.scoped.css"
export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username:"",
    firstName:"",
    lastName:"",
    email:"",
    password:"",
  });
  function handleFormSignIn(event){
    setUser({...user, [event.target.name] : event.target.value});
  }
  function redirectionToSignIn()
  {

    navigate("/login");
  } 
  function creationOfUser(){
    console.log(JSON.stringify(user));
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    };
    fetch("http://localhost:4000/users", options)
    .then(response => response.json())
    .then(data => console.log(data))
      .catch((error) => console.log(error));
  }
  return (<div className="container">
    <div className="container-auth">
    <header className="header header"> SIGN UP
    <p className="title-1"> And start dating !</p>
    <button className="button-discord title-1"> <span>
      Connect with discord
      </span>
       <FaDiscord/></button>
    </header>
       <hr className="hr"/>
       <form  className="container-form">
        <label className="label body"> Username
        </label>
        <input className="input" name="username" type="text" onChange={handleFormSignIn} value={user.username}/>
        <label className="label body" > first name
        </label>
        <input className="input" name="firstName" type="text" onChange={handleFormSignIn} value={user.firstName} />
        <label  className="label body"  > last name
        </label>
        <input className="input" name="lastName" type="text" onChange={handleFormSignIn} value={user.lastName} />
        <label   className="label body" > email
        </label>
        <input  className="input" name="email" type="email"  onChange={handleFormSignIn} value={user.email} />
        <label  className="label body"  > password
        </label>
        <input className="input" name="password" type="password"  onChange={handleFormSignIn} value={user.password} />

       </form>
        <button className="button-submit title-1" onClick={creationOfUser}> Signup</button>
        <button className="login body" onClick={redirectionToSignIn}> Already have an account ?<br/> Login</button>
    </div>
    <div className="container-img">
      <div className="img-right"></div>
    </div>
    </div>)
}
