import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ContactPage from './pages/ContactPage/ContactPage'
import ContactDetails from './pages/ContactDetails/ContactDetails'
import ContactEdit from './pages/ContactEdit/ContactEdit'
import Store from './store/Store'

import './App.css'
import './assets/icon-font/flaticon.css'
// import { fail } from 'mobx/lib/utils/utils';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Router>
          <div className="app-main">
            <header className="app-header">

              <NavLink to="/"><h4>Mr.BitCoin</h4></NavLink>
              <NavLink to="/contacts">
                <i className="flaticon-group-of-businessmen"></i>
                {/* <img src="https://cdn2.iconfinder.com/data/icons/clean-and-simple/153/Contacts-32.png" alt=""/> */}
              </NavLink>
            </header>

            <div className="app-content">
              <Switch>
                <Route path="/contacts/edit/:id?" render={(props) => <ContactEdit {...props} store={Store.contactStore} />} />
                <Route path="/contacts/:id" render={(props) => <ContactDetails {...props} store={Store} />} />
                <Route path="/contacts" render={(props) => <ContactPage {...props} store={Store.contactStore} />} />
                <Route path="/login" component={LoginPage} />
                <Route path="/" render={(props) => <HomePage {...props} store={Store} />} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
