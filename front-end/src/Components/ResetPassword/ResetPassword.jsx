import React, { useEffect, useState } from 'react'
import { notify } from '../Global/toast-notify';
import { useParams } from "react-router-dom"
export default function ResetPassword() {
  const [ email, setEmail] = useState("");
  const res = useParams();
  console.log(res);
  // useEffect(() => {

  // }, [])
  async function handleReset(e){
    if ( email.length == 0 ){
      notify("warning", " you have to fill with your email adresse")
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify({email: email})
    };
    fetch("http://localhost:4000/users/send-password-reset", options)
      .then(response =>{
        if ( response.status == 401){
          notify("error", "email doesnt match");
          return response.json()
        }
        else if ( response.status == 200){
          notify("sucess", "check your email")
          return response.json()
        }
        return response.json()
      }
      )
      .then(data => console.log(data))
      .catch((error) => {
        notify("error", "email doesnt match");
      });

  }
  return (
    <div>
      <input type={"email"}   value={email} onChange={(event) => setEmail(event.target.value)}/>
      <input type={'submit'} onClick={handleReset} />
    </div>
  )
}
