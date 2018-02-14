import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './ContactFilter.css'

@observer 
export default class ContactFilter extends Component {

    onInputChange = (ev) => {
        this.props.store.filter = ev.target.value
    }
    render() {
        const { filter } = this.props.store
        return (
            <div className="contact-filter">
                <input
                    placeholder="Search"
                    value={filter}
                    onChange={this.onInputChange.bind(this)} />
            </div>
        )
    }
}

