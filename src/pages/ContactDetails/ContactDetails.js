import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ContactDetails.css'
import imAvatar from '../../assets/img_avatar.png'
import { observer } from 'mobx-react'
import MoveList from '../../components/MoveList/MoveList'

@observer
class ContactDetails extends Component {
  constructor() {
    super()
    this.state = { value: 0, moves: [], animateValue: false }
  }
  componentWillMount() {
    const id = this.props.match.params.id // params -> from url
    this.props.store.contactStore.currContactId = id
    this.props.store.userStore.currContactId = id
  }
  valueChanged(event) {
    let { value } = event.target
    let { coins } = this.props.store.userStore.user
    if (+value > coins) value = coins;
    event.target.value = parseFloat(value) || value
    this.elAnimValue.innerText = event.target.value
  }

  transferCoins() {
    const amount = this.inp.value
    if (amount <= 0) return
    const contactId = this.props.match.params.id
    this.inp.value = 0
    this.elAnimValue.style.animation = 'sendCoinAnimation 1s infinite'
    setTimeout(() => {
      this.props.store.userStore.addMove(amount, contactId)
      this.elAnimValue.style.animation = ''
      
    }, 1000);
  }

  render() {

    const { currContact } = this.props.store.contactStore
    const { user } = this.props.store.userStore
    const { filteredMoves } = this.props.store.userStore

    return (
      <div className="contact-details">
        <header className="contact-details-header">
          <Link to={`/contacts`} >Back</Link>
          <Link to={`/contacts/edit/${currContact._id}`}>Edit</Link>
        </header>
        <div className="contact-details-body ">
          <img src={imAvatar} alt="Person" width="96" height="96" />
          <div className="contact-details-row-name animated slideInUp">{currContact.name}</div>
          <div className="contact-details-row-phone animated slideInUp">{currContact.phone}</div>
          <div className="contact-details-row-email animated slideInUp">{currContact.email}</div>
        </div>
        <div className="contact-transfer">
          <input ref={(inp) => { this.inp = inp }} type="number" max={user.coins} min="0" onChange={this.valueChanged.bind(this)} />
          <span className="anim-value" ref={(elAnimValue) => { this.elAnimValue = elAnimValue }}></span>
          <button onClick={this.transferCoins.bind(this)}>Transfer</button>
        </div>
        <MoveList moves={filteredMoves} anim={true} />
      </div>
    )
  }

}

export default ContactDetails

