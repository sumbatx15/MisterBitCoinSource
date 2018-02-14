import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ContactList from '../../components/ContactList/ContactList'
import ContactFilter from '../../components/ContactFilter/ContactFilter'

import './ContactPage.css'

import { observer } from 'mobx-react'

@observer class ContactPage extends Component {

  componentDidMount() {
    console.log('Mountefd')
    this.props.store.loadContacts();
  }
  // contactSearch = (term) => {
  //   ContactStore.filter(term);
  // }

  render() {
    const { filteredContacts } = this.props.store;

    return (
      <div className="contacts-page">
        <div className="search-container">
          <ContactFilter store={this.props.store} />
        </div>
        <div className="contacts-container">
          <ContactList contacts={filteredContacts} />
        </div>
        <div className="action-container">
          <Link to={'/contacts/edit/'}>+</Link>
        </div>
      </div>
    );
  }
}

export default ContactPage;
