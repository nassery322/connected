import React, {useState, useEffect, useRef, useId} from "react";
import ManageProfileModal from "../../UI/ManageProfileModal";
import './ManageProfile.css'
import { storage, auth } from './firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {onAuthStateChanged, updatePassword} from 'firebase/auth';
import Crop from "./Crop";
const ManageProfile = props =>{
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState('')
    const imageRef = ref(storage, `images/${Math.random().toString()}`)
    const image = useRef();
    const updatedName = useRef();
    const updatedLastname = useRef();
    const currentPassRef = useRef();
    const [userId, setUserId] = useState(null)
    const newPassRef = useRef();
    const [isLoading, setIsLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false);
    const [cropImage, setCropImage] = useState(null)
    // async function fetchData(e){
     
        
    // }
      useEffect( ()=>{
        onAuthStateChanged( auth, async (currentUser) => {
            setUserId(currentUser.uid)
        }, []  )
    } )

    function resetHandler() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('show'));
      }

    async function updateProfilePictureHandler(picture){

        setImageUploading(true)
        const imageElement = document.createElement('img');
        imageElement.src = picture;
      
        await new Promise(resolve => imageElement.addEventListener('load', resolve));
      
        const canvas = document.createElement('canvas');
        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;
        canvas.getContext('2d').drawImage(imageElement, 0, 0);
      
        const file = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    uploadBytes(imageRef, file).then((snapshot) => getDownloadURL(snapshot.ref).then(url => {
        setImageURL(url)
      }).then(() => setImageUploading(false)))
      setCropImage(false)
}


function collapseHandler(e){
    resetHandler()
    e.target.nextSibling.classList.add('show')
}
const user = auth.currentUser

function changeImageHandler() {
    setCropImage(image.current.files[0]);
  }

async function applyHandler(event){
    event.preventDefault();
    setIsLoading(true)
    if(newPassRef.current.value.trim().length > 7){
        updatePassword(user, newPassRef.current.value).then(() => {
        
        }).catch((error) => {
            console.log(error.message)
          });
    }
    
    const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/userdata/${userId}.json`)
    const data = await response.json();
    for(const key in data){
        if(imageURL){
            data[key].file = imageURL
        }
        if(updatedName.current.value.trim().length > 0){
        data[key].name = updatedName.current.value
        }
        if(updatedLastname.current.value.trim().length > 0){
            data[key].lastname = updatedLastname.current.value
            }
    }
    
        await fetch(`${process.env.REACT_APP_DATABASE_URL}/userdata/${userId}.json`, {
        method : 'PATCH',
        body: JSON.stringify(data)
    })
setIsLoading(false)
props.onClick(true);
}
const applyBtn = isLoading? "Applying changes" : "Apply";
    return <ManageProfileModal onClick={props.onClick}>
        <div className="manage-profile">
            <h5>Manage your profile</h5>
            <form className="update-form">
                <div className="update-form-container">
                <button type="button" onClick={collapseHandler} class="btn btn-primary change-btn">Update your Profile picture</button>
                <div className="form-group a">
                    <label htmlFor="updateProfile">New profile picture:</label>
                <input ref={image} type='file' onChange={changeImageHandler} style={{ 'background': 'white', 'height':'auto' }}/>
                {cropImage && <Crop image={cropImage} onImageCropped={updateProfilePictureHandler} />}
                <p>{imageUploading && 'Uploading...'}</p>
                </div>
                <button type="button" onClick={collapseHandler} class="btn btn-primary change-btn">Update your name</button>
                <div className="form-group a">
                <label htmlFor="updateName">New First Name:</label>
                <input type='text' ref={updatedName} />
                </div>
                <button type="button" onClick={collapseHandler} class="btn btn-primary change-btn">Update your Last name</button>
                <div className="form-group a">
                <label htmlFor="updateName" >New Last Name:</label>
                <input type='text' ref={updatedLastname}/>
                </div>
                <button type="button" onClick={collapseHandler} class="btn btn-primary change-btn">Change your password</button>
                <div className="form-group a">
                
                <label htmlFor="newpass">New password:</label>
                <input type='test'name="newpass" ref={newPassRef}/>
                </div>
                </div>
                <div className="button-section">
                <button className="btn btn-danger" onClick={applyHandler}>{applyBtn}</button><button className="btn btn-secondary" onClick={props.onClick}>Cancel</button>
                </div>
            </form>
            
        </div>
    </ManageProfileModal>
}

export default ManageProfile;