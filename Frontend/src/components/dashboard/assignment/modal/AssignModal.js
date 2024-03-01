import React, { useState } from 'react'
import './assignModal.css'
// import MyQuill from '../../main/MyQuillEditor'
import Quill from '../myQuillModal/MyQuill'
export default function AssignModal({onClose, onCloseModal}) {
  const api = 'notification/createNotification'
  const [notification, setThisNotification] = useState(true);

  const handleOpenNoti = (e) => {
    setThisNotification(true);
  };

  const handleCloseNoti = (e) => {
    onCloseModal()
    setThisNotification(false);

  };

  const tt = (e) => {
    console.log("thinh");
  }
  return (
    <div>
      {
        notification &&  <Quill api={api} onClose={handleCloseNoti} onSave={tt}/>
      }
  
    </div>
  )
}
