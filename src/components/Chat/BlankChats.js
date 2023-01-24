import React from 'react'
import './BlankChats.css'


const BlankChats = props =>{
    return <React.Fragment>
        <div className='blank-chats'>
        <i className="fa-regular fa-address-book"></i>
        <div className='blank-chat-quote'>You have no chats yet!</div>
        
        </div>
    </React.Fragment>
}

export default BlankChats;