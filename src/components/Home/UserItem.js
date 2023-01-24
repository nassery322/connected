import React from 'react'
import './UserItem.css'
import pic from '../../assets/blank.jpg'
import { Auth } from 'firebase/auth'
import { auth } from './firebase'
const UserItem = props =>{
    function userSelectedHandler(){
        const userData = {
            id: props.id,
            name: props.name,
            lastname: props.lastname,
            file:props.file,
            chatId: `${auth.currentUser.uid}${props.id}`
        }
        props.onUserSelect(userData)
    }

    const name = props.name + " " + props.lastname;
    return <React.Fragment>
        <div className='user-item'>
            <div className='user-photo'><img src={props.file} /></div>
            <div className='name-chat'>
            <div className='user-name'>{name}</div>
            <div className='chat-user'><i  onClick={userSelectedHandler} class="fa-regular fa-message"></i></div>
            </div>
            
        </div>
    </React.Fragment>
}



export const UserItemChatScreen = props =>{
    
    const name = props.userData.name + " " + props.userData.lastname;
    return <React.Fragment>
            <div className='user-item-chat-screen'>
            <div className='back'><button className='back-btn' onClick={props.onClose}><i class="fa-solid fa-arrow-left"></i></button></div>
            <div className='photo-name'>
            <div className='user-photo'><img src={props.userData.file} /></div>
            
            <div className='user-name '>{name}</div></div>
            
            </div>
    </React.Fragment>
}
export const  UserItemChat = props =>{
    const name = props.name + " " + props.lastname;
function dataHandler(){
    const data ={
        id:props.id,
        name:props.name,
        lastname:props.lastname,
        file:props.file
    }
    props.onUserData(data)
}
    return <React.Fragment>
        <div className='user-item-chat' onClick={dataHandler}>
        <div className='user-photo'><img src={props.file} /></div>
        <div className='user-name '>{name}</div>
        <div className='notif'></div>
        </div>
    </React.Fragment>
}
export default UserItem;