import React, {useState, useEffect} from 'react'
import ChatScreen from '../Chat/ChatScreen';
import './Home.css'
import HomeBody from './HomeBody';
import HomeHeader from './HomeHeader';
import Users from './Users';
import { auth } from './firebase';
import BlankChats from '../Chat/BlankChats';
import Chats from '../Chat/Chats';
import LoadingSpinner from '../../UI/LoadingSpinner';

const Home = props =>{
    const [chatPartnerSelected, setChatPartnerSelected] = useState(false);
    const [userData, setUserData] = useState(null);
    const [chatExist, setChatExist] = useState(false);
    const [userHasChats, setUserHasChats] = useState(false);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

   async function userDataHandler(data){
        const sharedId = `${data.id}${auth.currentUser.uid}`
    try {
        const response = await fetch(`https://connected-c86f2-default-rtdb.firebaseio.com/chatdata/${sharedId}.json`);
        const data = await response.json();
        if (Object.keys(data).length > 0) {
            setChatExist(true)
        } else {
            setChatExist(false)
        }
      } catch (error) {
      }
         setChatPartnerSelected(true)
        setUserData(data)
        setUserHasChats(true)
    
    
    }
    function closeHandler(){
        setChatPartnerSelected(false);
        setUserData(null)

    }
   async function userChats(e){
        const response1 = await fetch(`https://connected-c86f2-default-rtdb.firebaseio.com/userdata/${e}/chats.json`, {
  method: 'GET'
});
const chats = await response1.json();
if(chats){
    setUserHasChats(true)
}
    }
    useEffect( ()=>{
        setTimeout(() => {userChats(auth.currentUser.uid)}, 1000);
    }, [auth])
    useEffect(() => {
        setTimeout(() => {
            const handleResize = () => {
                if (window.innerWidth < 690) {
                  setUserHasChats(true);
                } 
              };

              handleResize()
              window.addEventListener('resize', handleResize);
          
              return () => {
                window.removeEventListener('resize', handleResize);
              };
        }, 1000);
       
      }, []);
   
function chatsHandler(e){
    if(e.length < 1 || e === false){
        if(window.innerWidth > 690){
            setUserHasChats(false)
        }
    }

}
    function userIsLoggedInHandler(event){
        setUserIsLoggedIn(event)
    }
    
    
    const chatContent =<React.Fragment>
       {chatPartnerSelected ? <ChatScreen chatExist={chatExist} onClose={closeHandler} userData={userData} /> : <Chats onChats={chatsHandler}  userData={userDataHandler}/>
}
                    </React.Fragment> 
    const emptyChats = <React.Fragment><Users userSelected={userDataHandler}/> <BlankChats /></React.Fragment>
    return <React.Fragment>
        <div className='home-container'>
       {!chatPartnerSelected && <HomeHeader />}
        <HomeBody userIsLoggedIn={userIsLoggedInHandler} />
        {userIsLoggedIn && <React.Fragment>{ userHasChats ? chatContent : emptyChats}</React.Fragment>}

        </div>
    </React.Fragment>
}

export default Home;