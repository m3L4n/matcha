import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./LandingPage.scoped.css";
export default function LandingPage() {
  const navigate = useNavigate();

    function redirectionToRegister(){
      navigate("/register");
    }
    function redirectionToSignIn()
    {

      navigate("/login");
    } 
  return (
    <div className='container'>
      <div className='header-vertical'>

      <div className='image-left'> 
      <div className='matcha-left passion-one'> MATCHA</div>
      </div>
      <div className='matcha-after-img'>
        <div className='matcha-right passion-one'> MATCHA</div>
        </div>
      </div>
      <header className='header-landing-page'>
        <button className='button body' onClick={redirectionToRegister}> Sign in</button>
        <button className='button body' onClick={redirectionToSignIn}> Sign up </button>
      </header>
      <div className='body-landing-page'>

      <div className='center-landing-page'>
      <p className='header'> MATCHA</p>
      <p className='title-2'> Date at your favorite coffee shop</p>
      <button className='title-1 button-action' onClick={redirectionToRegister}> Start dating now !</button>
        </div>
      <div className='container-image-absolute-left'/>
        <div className='container-image-absolute-bottom'/>
      </div>

      </div>
  )
}
