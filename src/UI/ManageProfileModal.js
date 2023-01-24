import ReactDOM from 'react-dom'
import React from 'react';
import './ManageProfileModal.css'

const Backdrop = props => {
  return  <div className='backdrop' onClick={props.onClick}/>
}
const Overlay = props => {
return <div className='manage-profile-modal'><div className='modal-content'>{props.children}</div></div>
}

const ManageProfileModal = props => {

return  <React.Fragment>
     {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById('overlay'))}
   {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, document.getElementById('overlay'))} 
        </React.Fragment>

}

export default ManageProfileModal;