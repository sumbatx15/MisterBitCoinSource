import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react'

import imAvatar from '../../assets/img_avatar.png'
import './ContactEdit.css'

const Header = ({ contact, onDeleteContact }) => {
  const backUrl = contact._id ? `/contacts/${contact._id}` : `/contacts`

  return (
    <header className="contact-edit-header">
      <Link to={backUrl}>Back</Link>
      {contact._id && <Link to='/' onClick={onDeleteContact}>Delete</Link>}
    </header>
  )
}

@observer class ContactEdit extends Component {
  constructor(props){
    super(props)
    this.state = {contact:{}}
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id; // params -> from url
    this.props.store.currContactId = id;
    this.props.store.getContactById(id).then(contact => {
      this.setState({contact})
    })
  }

  onInputChange(field) {
    return (event) => {
      const contact = {...this.state.contact,[field]: event.target.value}
      this.setState({contact})
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault()
    this.props.store.saveContact(this.state.contact).then(contact => {
      this.props.history.push('/contacts/' + contact._id);
    });
  }

  onDeleteContact = () => {
    // ContactService.deleteContact(this.state.contact._id)
    //   .then( () => this.props.history.push(`/contacts`))
  }

  render() {
    const { currContact } = this.props.store
    return (
      <div className="contact-edit">
        <Header contact={currContact} onDeleteContact={this.onDeleteContact} />
        <div className="contact-edit-body">
          <img src={imAvatar} alt="Person" width="96" height="96" />

          <form onSubmit={this.onFormSubmit} className="contact-edit-form">

            <div className="form-group">
              <input
                placeholder="Name"
                type="text"
                value={this.state.contact.name}
                onChange={this.onInputChange('name')} />
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone"
                value={this.state.contact.phone}
                onChange={this.onInputChange('phone')} />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={this.state.contact.email}
                onChange={this.onInputChange('email')} />
            </div>

            <div className="form-actions-container">
              <button type="submit">Save</button>
            </div>

          </form>
        </div>

        <br />
        <br />

      </div>
    )
  }

}

export default ContactEdit;
