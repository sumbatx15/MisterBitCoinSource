import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './MovePreview.css'
import ContactService from '../../services/ContactService'
@observer
class MovePreview extends Component {
  constructor() {
    super()
    this.state = { contactName: 'Unknow' }
  }
  componentWillMount() {
    ContactService.getContactById(this.props.move.contactId).then(contact => {
      this.setState({ contactName: contact.name })
    })
  }
  render() {
    const { move } = this.props
    return ( 
      <div className="move-preview">
        <div className="details">
          {this.props.showContactName && <span className="to"> To {this.state.contactName} </span>}
          <span className="amount"> Ƀ {move.amount} | <span className="amount-converted">$ {(move.amount * move.lastBtcUsd).toLocaleString()}</span></span>
          <span className="status">status : <span className={move.status ? 'approve' : 'pending'}>{move.status ? 'approve' : 'pending...'}</span></span>
          <span className="at">{new Date(+move.at).toLocaleString()}</span>
        </div>
      </div>
    )
  }


}

export default MovePreview;
