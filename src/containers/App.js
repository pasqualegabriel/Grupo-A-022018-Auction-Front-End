import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import { withNamespaces } from 'react-i18next';
import Header from '../components/Header';
import AuctionDetails from '../components/AuctionDetails';
import CreateAuction from '../components/CreateAuction';
import Auctions from '../components/Auctions';
import 'react-notifications/lib/notifications.css'
import Login from './Login'
import Home from './Home'

class App extends Component {

  getTranslation = (key) => this.props.t(key)

  changeLanguage = (lng) => {
    this.props.i18n.changeLanguage(lng)
  }

  getLanguage = () => this.props.lng

  render() {

    return (
      <div>
        <Header getTranslation={this.getTranslation} 
                changeLanguage={this.changeLanguage}
                getLanguage={this.getLanguage}/> 
        <Switch>
          <Route exact path="/home"     render={()=><Home/>}/>
          <Route exact path="/signIn"   render={()=><Login getTranslation={this.getTranslation} />}/>
          <Route exact path="/auction"  render={()=><CreateAuction  getTranslation={this.getTranslation} />}/>
          <Route exact path="/auctions" render={()=><Auctions  getTranslation={this.getTranslation} />}/>
          <Route exact path="/detail"   render={()=><AuctionDetails getTranslation={this.getTranslation} />}/>
        </Switch>

        <div>
          {/* <img src='https://i.ytimg.com/vi/UcMMA7KKBsk/maxresdefault.jpg' alt="" sizes></img> */}
        </div>
        
      </div>
    );
  }
}

export default withNamespaces('translation')(App);
