import React, {useState} from 'react'
import './Profile.css'
import ProfileModal from '../../UI/ProfileModal';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import ManageProfile from './ManageProfile';
const Profile = props =>{
    const [manageProfile, setManageProfile] = useState(false)
    const name = props.profileInfo.name;
    const lastname = props.profileInfo.lastname;
    const profileName = name + " " + lastname;
    
    const signoutHandler = async () => {
        await signOut(auth);
        window.location.reload();
    };
    function manageProfileHandler(){
        setManageProfile(e => !e)
    }
    return <React.Fragment>{!manageProfile?
        <ProfileModal onClick={props.onClick}>
        <div className='profile'>
           <div className='profile-photo'><img src={props.profileInfo.file}/></div>
           <div className='profile-name'>{profileName}</div>
           <div className='buttons'>
           <button className='mannage-btn' onClick={manageProfileHandler}><i class="fa-solid fa-user-plus"></i> Mannage Profile</button>
           <button className='signout-btn' onClick={signoutHandler}>Sign Out</button>
           </div>
           
        </div>
    </ProfileModal>: <ManageProfile onClick={manageProfileHandler} />}
        </React.Fragment>

}

export default Profile;