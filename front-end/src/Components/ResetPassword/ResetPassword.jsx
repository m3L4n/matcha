import React, { useState } from 'react'
import { notify } from '../Global/toast-notify';

export default function ResetPassword() {
  const [ email, setEmail] = useState("");

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
        console.log(response);
        response.json()
      }
      )
      .then(data => console.log(data))
      .catch((error) => console.log("cc",error));

  }
  return (
    <div>
  <input type={"email"}   value={email} onChange={(event) => setEmail(event.target.value)}/>
  <input type={'submit'} onClick={handleReset} />
    </div>
  )
}
