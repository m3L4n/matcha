import React from 'react'
import { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { notify } from '../../Global/toast-notify';
export default function HomeNoneVerified() {
  const { state } = useLocation();
  const navigate = useNavigate()
  let count = 0;

  useEffect(() =>{
    if (count == 0){
      verifyData();
    }
    count = 1;
  }, [])

  function verifyData(){
    if (!state?.datae){
        notify('error', "you have to be connected to see this page");
        navigate('/login')
        return

    }
  }
  function resendEmail(){
    const username =state.datae; 
    const objToSend = {'username': username};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify(objToSend)
    };
    fetch("http://localhost:4000/users/send-email-verification", options)
      .then(response =>{
        console.log(response);
        if ( response.status == 200){
          notify("sucess", "check your email, your link will be send in the second")
        }
        return response.json()
      }
      )
      .then(data => console.log(data))
      .catch((error) => {
        notify("error", "we can't send email for the moment, please retry")
        
      }
      
      );
}

  return (
    <div>
      you have to valided your email
      <button onClick={resendEmail}> re send email verification</button>
      <Link to="/login" >  go back login</Link>

    </div>
  )
}
