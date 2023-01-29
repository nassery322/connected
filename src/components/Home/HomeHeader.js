import React, {useEffect, useState} from 'react'
import './HomeHeader.css'
import connectLogo from '../../assets/download.png'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Profile from './Profile';
const HomeHeader = props =>{
    const [userInfo, setUserInfo] = useState(null);
    const [showProfile, setShowProfile] = useState(false)
    async function fetchData(e){
        const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/userdata/${e}.json`)
        const data = await response.json();
      
    const loadedData = [];
     for(const key in data){
         loadedData.push({
             name:data[key].name,
             lastname:data[key].lastname,
             file:data[key].file
         })
         setUserInfo(loadedData[0])
    }
 
    }
    function profileHandler(){
        setShowProfile(e => !e)
    }
      useEffect( ()=>{
        onAuthStateChanged( auth, async (currentUser) => {
               fetchData(currentUser.uid)
        }, [userInfo]  )
    } )

    async function signouthandler(){
       await signOut(auth)
    }
    const navContent = <div className='home-nav'><a href='#' >{userInfo? <div className='user-icon' onClick={profileHandler}><img src={userInfo.file} /></div>: "Home"}</a></div>
    
    return <React.Fragment>
        <div className='home-header'>
            <div className='home-logo'><img src={connectLogo} alt="Connect logo" /></div>
        {navContent}
        {showProfile && <Profile onClick={profileHandler} profileInfo={userInfo? userInfo : ''} />}
        
        </div>
    </React.Fragment>
}

export default HomeHeader;