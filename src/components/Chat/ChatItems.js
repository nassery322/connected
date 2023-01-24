import React from 'react'
import './ChatItems.css'


export const ChatSent = props =>{
    return <React.Fragment>
        <div className='chat-sent-container aa'>
        <div className='chat-sent'>
           <div>{props.message}</div> 
            <div className='time1'>{props.time}</div>
        </div>
        </div>
       
    </React.Fragment>
}

export const ChatReceived = props =>{
    return <React.Fragment>
        <div className='chat-received-container aa'>
        <div className='chat-received'>
            <div>{props.message}</div>
        
        <div className='time2'>{props.time}</div>
        </div>
        </div>
        
    </React.Fragment>
}

