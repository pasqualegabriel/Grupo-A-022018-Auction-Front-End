import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import Header from '../components/Header';
import AuctionDetails from '../components/AuctionDetails';
import 'react-notifications/lib/notifications.css'
import Login from './Login'
import Home from './Home';


export default class App extends Component {
  
  constructor(){
    super();
    this.state = { 
      name: ""
    }
  }

  render() {
    return (
      <div>
          <Header/>
          <Switch>
            <Route exact path="/" render={()=><Home anUserName={this.state.name}/>}/>
            <Route exact path="/signIn" component ={Login}/>
            <Route exact path="/auction" component ={AuctionDetails}/>
          </Switch>
      </div>
    );
  }
}
