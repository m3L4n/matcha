import React, { useEffect, useState } from "react";
import { notify } from "components/Global/toast-notify";
import { useParams } from "react-router-dom";

function ComponentsResendEmailPassword({email, handleChange, handleReset}){

return (
  <>
    <h1>resend email</h1>
    <form>
    <input
      type={"email"}
      value={email}
      placeholder="email"
      onInput={handleChange}
    />
    <input type={"submit"} onClick={handleReset}/> 
  </form>
</>
)}

function ComponentsresetPassword({password, confirmPassword, handleChange, handleResetPassWord}){

  return (
    <>
      <input type={"password"}  name={"password"} value={password} placeholder="password" onChange={handleChange}/>
      <input  type={"password"} name={"confirmPassword"} value={confirmPassword} placeholder="confirm you password" onChange={handleChange}/>
      <input type={"submit"}  onClick={handleResetPassWord}/>
    </>
  )
}

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(1)  // 1 = send email reste password // 0 = change password
  const [ password, setPassword] = useState({
    password : "",
    confirmPassword : "",
  })
  const res = useParams();

  useEffect(() => {
    if (Object.keys(res).length > 0){
          setSendEmail(0);
    }
    else{
      setSendEmail(1); 
    }
  }, [res])

  async function handleReset(e) {
    e.preventDefault();
    if (email.length == 0) {
      notify("warning", " you have to fill with your email adresse");
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include",
      body: JSON.stringify({ email: email })
    };
    fetch("http://localhost:4000/users/send-password-reset", options)
      .then(response => {
        if (response.status == 401) {
          notify("error", "email doesnt match");
          return response.json();
        } else if (response.status == 201) {
          notify("sucess", "check your email");
          return response.json();
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => {
        notify("error", "email doesnt match");
      });
  }

  async function handleChange(event) {
    console.log(event.target.value);
    setEmail(event.target.value);
  }
  function handleChangePassWord(event){
    setPassword({...password, [event.target.name] : event.target.value});
  }
  function handleResetPassword(event){
    event.preventDefault();
    if (password.password.length == 0 || password.confirmPassword.length == 0 ){
      notify("error", "you cant submit this, you have to fill the passwords input")
      return
    }
    if ( password.password != password.confirmPassword){
      notify("error", "password are different, please re fille the input with same password");
      return 
    }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: res.id,
        password: password.password,
      })
    };
    fetch("http://localhost:4000/users/changePassword", options)
    .then(response => {
      if (response.status == 200) {
        notify("sucess", "your password are sucessfuly changed");
        setPassword({
          password: "",
          confirmPassword: ""
        })
      }
      else if ( response.status == 500){
        notify("error", "cant update password now, but you can contact us or retry later ")
      }
      return response.json();
    })
    .then(data => {
    })
    .catch(error => console.log(error));
  }

  return (
    <div>

      {sendEmail && <ComponentsResendEmailPassword email={email} handleChange={handleChange} handleReset={handleReset}/>}
      {!sendEmail && <ComponentsresetPassword password={password.password} confirmPassword={password.confirmPassword}  handleChange={handleChangePassWord} handleResetPassWord={handleResetPassword}/>}
    </div>
  );
}
