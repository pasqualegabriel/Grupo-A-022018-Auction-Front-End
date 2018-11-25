import React, { Component } from 'react'
import '../App.css'
import { Route, Router } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import HeaderM from '../components/Header'
import AuctionDetails from '../components/AuctionDetails'
import CreateAuction from '../components/CreateAuction'
import AuctionsSearch from '../components/AuctionsSearch'
import 'react-notifications/lib/notifications.css'
import Login from './Login'
import Home from './Home'
import Callback from '../Callback/Callback'
import Auth from '../Auth/Auth'
import history from '../history'
import AuctionService from '../services/AuctionService'
import FirstOffer from '../components/FirstOffer'

const auth = new Auth()

const auctionService = new AuctionService()
auctionService.postToken()

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

  tick = () => {

  }

  componentDidMount = () => {
    this.interval = setInterval(() => this.tick(), 2000);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  getTranslation = key => this.props.t(key)

  changeLanguage = lng => this.props.i18n.changeLanguage(lng)

  getLanguage = () => this.props.lng

  render() {

    return (
        <div>
          <HeaderM  auth={auth}
                    getTranslation={this.getTranslation} 
                    changeLanguage={this.changeLanguage}
                    getLanguage={this.getLanguage}/> 

            <Router history={history}>
            <div>
              <Route exact path="/home"            render={(props) => <Home {...props} auth={auth} />} />
              <Route exact path="/"                render={  ()    => <Login           auth={auth} getTranslation={this.getTranslation} />} />
              <Route exact path="/auction"         render={  ()    => <CreateAuction   auth={auth} getTranslation={this.getTranslation} />} />
              <Route exact path="/auctions/search" render={  ()    => <AuctionsSearch  auth={auth} getTranslation={this.getTranslation} />} />
              <Route exact path="/detail"          render={  ()    => <AuctionDetails  auth={auth} getTranslation={this.getTranslation} />} />
              <Route exact path="/firstOffer"      render={  ()    => <FirstOffer      auth={auth} getTranslation={this.getTranslation} />} />
              <Route path="/callback"              render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} /> 
              }}/>
            </div>
            </Router>
          </div>
    )
  }
}

export default withNamespaces('translation')(App);

/* getEmail()
​family_name: "Pascu"
​gender: "male"
​given_name: "Gabi"
​locale: "es"
​name: "Gabi Pascu"
​nickname: "pasquboca12"
​picture: "https://lh5.googleusercontent.com/-Y7UIVRd2q64/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-iQAqAgDQ-zDA9bvCxk_FQ1wMtoig/mo/photo.jpg"
​sub: "google-oauth2|110413001118045220048"
​updated_at: "2018-11-24T04:47:10.471Z"
*/
