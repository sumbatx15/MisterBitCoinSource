import React, { Component } from 'react';
import './LoginPage.css'
import Logo from '../../assets/logo.png'
class LoginPage extends Component {

  render() {
    return (
      <div className="home-page">
        <h4>Welcome to Mr.BitCoin</h4>
        <img src={Logo} alt="" />
        <input type="text" placeholder="Enter username..." />
      </div>
    );
  }
}

export default LoginPage;
