import React, {useState, useRef, useEffect} from 'react'
import './HomeBody.css'
import {auth, storage} from './firebase'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from 'firebase/auth'

const Login = props =>{
   
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const emailRef = useRef();
    const passwordRef = useRef();
    

async function submitHandler(event){
    setError('')
    event.preventDefault();
    if(emailRef.current.value.length === 0){
        setError("please input your E-Mail in the field")
        return;
    }
    if( passwordRef.current.value.length === 0){
        setError('please input your password in the field')
        return;
    }
    setIsLoading(true)
    
    try {
        const user = await signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );

        
      } catch (error) {
        setError('Invalid E-Mail address or password!')
      }
      setIsLoading(false)
}
function changeHandler(){
    setError('')
}


    return <React.Fragment>
         <form className='login-form' onSubmit={submitHandler}>
            <div className='form-group'>
            <label htmlFor="email">Email:</label><br/>
    <input type='email' id="email" name='email' onChange={changeHandler} placeholder=' Enter your E-Mail' ref={emailRef} />
            </div>

    <div className='form-group'>
    <label htmlFor="password">Password</label><br/>
    <input type='password' id="password" name="password" onChange={changeHandler} placeholder=' Enter your Password' ref={passwordRef}/>
    </div>
    <div className='form-group'>
   <label htmlFor='remember'>  <input name='remember'  id='remember' type='checkbox' /> Remember me</label>
    </div>
           <p className='error'>{error}</p>
        <button className='btn btn-danger submit-btn'>
            {isLoading? 'Logging in' : 'Log in'}
        </button>
        
        </form>
                
    </React.Fragment>
}

export default Login;