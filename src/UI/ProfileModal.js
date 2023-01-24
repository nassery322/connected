import ReactDOM from 'react-dom'
import React from 'react';
import './ProfileModal.css'

const Backdrop = props => {
  return  <div className='profilebackdrop' onClick={props.onClick}/>
}
const Overlay = props => {
return <div className='profile-modal'><div className='modal-content'>{props.children}</div></div>
}

const ProfileModal = props => {

return  <React.Fragment>
     {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById('overlay'))}
   {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, document.getElementById('overlay'))} 
        </React.Fragment>

}

export default ProfileModal;