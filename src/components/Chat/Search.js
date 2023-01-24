import React, {useState, useEffect} from 'react'
import { UserItemChat } from '../Home/UserItem';
import './Search.css'
import { auth } from '../Home/firebase';
const Search = props =>{
    const [enableSearchTab, setEnableSearchTab] = useState(false);
    const [usersData, setUsersData] = useState();
    const [filterdSearches, setFilerdSearches] = useState(null)
   
    
    async function fetchData(){
        const response = await fetch('https://connected-c86f2-default-rtdb.firebaseio.com/userdata.json');
        const data = await response.json()
        let loadedData = [];
        
        for (const key in data) {
        const nestedData = data[key];
const keys = Object.keys(nestedData);  // Get the keys of the object
const firstKey = keys[0];  // Get the first key
const firstProperty = nestedData[firstKey];
loadedData.push({
    id: key,
    name: firstProperty.name,
    lastname: firstProperty.lastname,
    file: firstProperty.file
});
    }
    const filtedLoadedData = loadedData.filter( user => user.id !== auth.currentUser.uid )
setUsersData(filtedLoadedData)
}


    useEffect( () =>{
        fetchData()
    }, [] )

    function searchChangeHandler(e) {
        const inputValue = e.target.value.toLowerCase().replace(/\s/g, '');
        if (inputValue.length > 0) {
          const filteredUsersData = usersData.filter(user => 
            `${user.name.toLowerCase().replace(/\s/g, '')}${user.lastname.toLowerCase().replace(/\s/g, '')}`.includes(inputValue));
          setFilerdSearches(filteredUsersData)
        } else {
          setFilerdSearches(null)
        }
      }
      

    function searchTabHandler(){
        setEnableSearchTab(true)
        props.onSearch(true)
    }
    function searchTabCloseHandler(){
        setEnableSearchTab(false)
        props.onSearch(false)
    }
    function userDataHandler(data){
        props.onUserData(data)
    }
    function refreshHandler(){
        props.onRefresh(true)
    }
    return <React.Fragment>
        <React.Fragment>
        
        </React.Fragment>
       
        <div className='search' >

        {!enableSearchTab ? <React.Fragment>
            <button className='search-btn' onClick={searchTabHandler}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
            <button className='search-btn refresh' onClick={refreshHandler}><i class="fa-solid fa-rotate-right"></i> Refresh</button> 
            </React.Fragment>:
        <React.Fragment>
        <form className='search-form'>
        <i class="fa-solid fa-arrow-left" onClick={searchTabCloseHandler}></i>  <input type='text' placeholder='Search' onChange={searchChangeHandler} />
        </form>
        <div className='search-results'>
            {filterdSearches? filterdSearches.map( (user) => <UserItemChat onUserData={userDataHandler} id={user.id} key={user.id} name={user.name} lastname={user.lastname} file={user.file} /> ) : <React.Fragment>
            <div className='suggested'>Suggested for you:</div>
            {usersData && usersData.map( (user) => <UserItemChat onUserData={userDataHandler} id={user.id} key={user.id} name={user.name} lastname={user.lastname} file={user.file} /> )}
            </React.Fragment> }
        </div>
        </React.Fragment>}
        

        </div>
    </React.Fragment>
}

export default Search;