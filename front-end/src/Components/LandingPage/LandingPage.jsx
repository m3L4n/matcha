import React from 'react'
import "./LandingPage.scoped.css";
export default function LandingPage() {
  return (
    <div className='container'>
      <div className='image-left'> 
      <div className='matcha-left passion-one'> MATCHA</div>
      </div>
      <div className='matcha-after-img'>
        <div className='matcha-right passion-one'> MATCHA</div>
        </div>
      <header className='header-landing-page'>
        <button className='button body'> Sign in</button>
        <button className='button body'> Sign up </button>
      </header>
      <div className='center-landing-page'>
      <p className='header'> MATCHA</p>
      <span className='title-2'> Date at your favorite coffee shop</span>
      <button className='title-1 button-action'> Start dating now !</button>
      </div>
      <div className='container-image-absolute-left'>
        <div className='image-absolute-left'></div>
        </div>
        <div className='container-image-absolute-bottom'>

        </div>
      </div>
  )
}
