import React, {useState, useEffect} from 'react'
import './HomeBody.css'
import Login from './Login';
import Signup from './Signup';
import {auth} from './firebase'
import {onAuthStateChanged} from "firebase/auth";

const HomeBody = props =>{

const [homeForm, setHomeForm] = useState('login');
const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
  function underLineStyle(e){
  const headers =  document.querySelectorAll('.header');
  headers.forEach( header => header.classList.remove('underLine'))
e.target.classList.add("underLine");
  }

  useEffect( ()=>{
    onAuthStateChanged( auth, (currentUser) => {
        if(currentUser){
  setUserIsLoggedIn(true)
  props.userIsLoggedIn(true)}})})

  function loginFormHandler(e){
    underLineStyle(e);
    setHomeForm('login')
  }
function signupFormHandler(e){
underLineStyle(e)
setHomeForm('signup')
  }
  function userDataHandler(data){
  }

    const displayedForm = homeForm === 'login' && <Login /> || homeForm === 'signup' && <Signup />
    return <React.Fragment>
        <div className='home-body'>
            
        {!userIsLoggedIn && <div className='home-content'>
            <div className='home-img'></div>
            <div className='home-form'>
            <div className='form-header'><div className='header underLine' onClick={loginFormHandler}>Login</div><div className='header' onClick={signupFormHandler}>Sign Up</div></div>
                {displayedForm}
            </div>
            
            </div> }
            
        </div>
    </React.Fragment>
}

export default HomeBody;