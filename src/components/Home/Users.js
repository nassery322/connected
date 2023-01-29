import React, { useEffect, useState } from 'react'
import UserItem from './UserItem';
import './Users.css'
import { auth } from './firebase';

const Users = props => {
    const [usersData, setUsersData] = useState([])
    async function fetchData() {
        const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/userdata.json`);
        const data = await response.json()
        let loadedData = [];
        
        for (const key in data) {
            const nestedData = data[key];
const keys = Object.keys(nestedData);  
const firstKey = keys[0]; 
const firstProperty = nestedData[firstKey];
loadedData.push({
    id: key,
    name: firstProperty.name,
    lastname: firstProperty.lastname,
    file: firstProperty.file
});
            
}
const filteredData = loadedData.filter( user => user.id !== auth.currentUser.uid )
        setUsersData(filteredData)
    }
    useEffect(() => {
        fetchData()
    }, [])
    function userSelectedHandler(data){
        props.userSelected(data)
    }
    return <React.Fragment>
        <div className='users-tab'>
            <div className='users-header'>
                People you my know
            </div>
            <div className='users-list'>
                {usersData.map((data) => <UserItem file={data.file} name={data.name} lastname={data.lastname} id={data.id} key={data.id} onUserSelect={userSelectedHandler}/>)}
            </div>
        </div>
    </React.Fragment>
}


export default Users;