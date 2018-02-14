import React from 'react';
import './ContactPreview.css'
import imAvatar from '../../assets/img_avatar.png'


const ContactPreview = ({contact}) => {
  return (
    <div className="contact-preview">
      <img src={imAvatar} alt="Person" />
      <div className="details">
        <span className="name">{contact.name}</span>
        <span className="phone">{contact.phone}</span>
      </div>
       
    </div>
  )

}

export default ContactPreview;
