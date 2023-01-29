import { async } from '@firebase/util'
import React, {useRef, useEffect, useState} from 'react'
import UserItem, { UserItemChatScreen } from '../Home/UserItem'
import { ChatReceived, ChatSent } from './ChatItems'
import './ChatScreen.css'
import { auth } from '../Home/firebase'


const ChatScreen = props =>{
    const [chatData, setChatData] = useState(null);
    const [updateChat, setUpdateChat] = useState(false)
    const containerRef = useRef(null);

const chatRef = useRef();
const sharedId = props.chatExist? `${props.userData.id}${auth.currentUser.uid}` : `${auth.currentUser.uid}${props.userData.id}`
async function getChatData(id){
      const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/chatdata/${id}.json`);
    const data = await response.json()
    let loadedData = []
    for(const key in data){
        loadedData.push({
            id:data[key].sender,
            message:data[key].message,
            time:data[key].time
        })
    }
    setChatData(loadedData)

}

    async function sentChatHandler(e) {
        e.preventDefault();
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      if (hours > 12) {
        hours -= 12;
      } else if (hours === 0) {
        hours = 12;
      }
      
      const timeString = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
      if(chatRef.current.value.trim().length > 0){
          const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/chatdata/${sharedId}.json`,{
          method: 'POST',
          body : JSON.stringify({
              sender: auth.currentUser.uid,
              message:chatRef.current.value,
              time:timeString
              })
               
})
chatRef.current.value = '';

const responseData = await response.json()


const selectedUser = `${process.env.REACT_APP_DATABASE_URL}/userdata/${props.userData.id}/chats.json`
const currentUser = `${process.env.REACT_APP_DATABASE_URL}/userdata/${auth.currentUser.uid}/chats.json`

const response1 = await fetch(currentUser);
const chats = await response1.json();
const fetchselectedUser = await fetch(selectedUser);
const selectedUserChats = await fetchselectedUser.json();

if(!selectedUserChats){
  const response2 = await fetch(selectedUser,{
    method: 'POST',
    body : JSON.stringify({id:auth.currentUser.uid
        })});
        
}
if(!chats){
  const response2 = await fetch(currentUser,{
    method: 'POST',
    body : JSON.stringify({id:props.userData.id
        })});
        return;
}
const chatsArray = Object.values(chats);

if (!chatsArray.some(chat => chat.id === props.userData.id)) {
  const response2 = await fetch(currentUser,{
    method: 'POST',
    body : JSON.stringify({id:props.userData.id})});
    const response3 = await fetch(selectedUser,{
      method: 'POST',
      body : JSON.stringify({id:auth.currentUser.uid})});

}
      
setUpdateChat(e => !e)
         
      }}

      useEffect(() => {
       
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }, 300); 
        const interval = setInterval(() => {
          getChatData(sharedId);
    
        }, 100);
        
        return () => clearInterval(interval);
        
      }, [updateChat]);
      const something = chatData && chatData.map((chat) => {
        return chat.id === auth.currentUser.uid ? (
            <React.Fragment>
            <ChatSent message={chat.message} key={Math.random().toString} time={chat.time}/>
          </React.Fragment>
          
        ) : (
            <React.Fragment>
            <ChatReceived message={chat.message} key={Math.random().toString} time={chat.time}/>
          </React.Fragment>
        );
      });
      
      
    return <React.Fragment>
        <div className='chat-screen'>
            <div className='chat-partner'><UserItemChatScreen onClose={props.onClose} userData={props.userData} /></div>
            <div className='chat-body' ref={containerRef}>
               {something}
            </div>
            <div className='chat-form'>
                <form onSubmit={sentChatHandler}>
                    <input type='text' ref={chatRef} placeholder='Write your message here' />
                    <button className='sent-chat-btn '><i class="fa-regular fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
        </React.Fragment>
}

export default ChatScreen