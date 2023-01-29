import React, {useState, useEffect} from 'react'
import { UserItemChat } from '../Home/UserItem';
import './Chats.css'
import { auth } from '../Home/firebase';
import Search from './Search';
import BlankChats from './BlankChats';
import LoadingSpinner from '../../UI/LoadingSpinner';


const Chats = props =>{
const [displayedChats, setDisplayedChats] = useState([]);
const [enableSearchTab, setEnableSearchTab] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [refresh, setRefresh] = useState(false)

    async function fetchData(e){
        setIsLoading(true)
        const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/userdata/${auth.currentUser.uid}/chats.json`)
        const data = await response.json();
    let loadedData = [];
     for(const key in data){
         loadedData.push({id:data[key].id})
     }

    const grabChats = await fetch(`${process.env.REACT_APP_DATABASE_URL}/userdata.json`);
        const chatData = await grabChats.json()
        let chats = [];
        for (const key in chatData) {
            const nestedData = chatData[key];
const keys = Object.keys(nestedData);  // Get the keys of the object
const firstKey = keys[0];  // Get the first key
const firstProperty = nestedData[firstKey];
chats.push({
    id: key,
    name: firstProperty.name,
    lastname: firstProperty.lastname,
    file: firstProperty.file
})}
const filteredChats = chats.filter(chat => {
    return loadedData.some(data => data.id === chat.id);
  });
  setDisplayedChats(filteredChats)
  setIsLoading(false)
  props.onChats(filteredChats)

}

    useEffect(()=>{
                fetchData();
    },[refresh])
    function chatHandler(e){
        props.userData(e)
    }
    function searchHandler(event){
setEnableSearchTab(event)
    }
    function refreshHandler(){
        setRefresh(e => !e)
    }
    return <React.Fragment>
        <div className='user-chats chat-screen'>
            <Search onSearch={searchHandler} onUserData={chatHandler} onRefresh={refreshHandler}/>
        
       {!enableSearchTab && <React.Fragment>

        {isLoading ? <LoadingSpinner /> : <React.Fragment>
        {displayedChats.length > 0 ?  displayedChats.map( chat => <UserItemChat onUserData={chatHandler} key={chat.id} id={chat.id} name={chat.name} lastname={chat.lastname} file={chat.file} />  ) : <BlankChats />}
        </React.Fragment>}
        
        </React.Fragment>}
        
        </div>
    </React.Fragment>
}

export default Chats;