import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { observer } from 'mobx-react'
import './MoveList.css';

import MovePreview from '../MovePreview/MovePreview'

@observer
class MoveList extends Component {

    render() {

        const movesList = this.props.moves.slice(0,this.props.max || this.props.moves.length).map((move, i) => {
            return (
                <li key={move._id} className={'move-list-item' && this.props.anim ? 'animated flipInX': ''}>
                    {
                        this.props.showContactName ?
                            <NavLink to={'/contacts/' + move.contactId} >
                                <MovePreview move={move} showContactName={this.props.showContactName} />
                            </NavLink>
                            :
                            <MovePreview move={move} showContactName={this.props.showContactName} />
                    }
                </li>
            )
        });

        return (movesList.length > 0 &&
            <div className="moves-list">
                <div className="moves-list-header">
                    <h4> ♺ {this.props.max ? 'Last ' + this.props.max + ' moves' : 'Moves History'}</h4>
                </div>
                <div className="moves-list-content">
                    <ul>
                        {movesList}
                    </ul>
                </div>
            </div>
        );
    }

}
export default MoveList;
