import React, { Component } from 'react';
import '../App.css';
// import { Route, Switch } from 'react-router-dom'
import { Route, Router } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import HeaderM from '../components/Header';
import AuctionDetails from '../components/AuctionDetails';
import CreateAuction from '../components/CreateAuction';
import AuctionsSearch from '../components/AuctionsSearch';
import 'react-notifications/lib/notifications.css'
import Login from './Login'
import Home from './Home'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Callback from '../Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

  state = { visible: false }

  handleShowClick = () => this.setState({ visible: true })

  handleSidebarHide = () => this.setState({ visible: false })

  getTranslation = (key) => this.props.t(key)

  changeLanguage = (lng) => this.props.i18n.changeLanguage(lng)

  getLanguage = () => this.props.lng

  render() {

    const { visible } = this.state

    return (
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
          <HeaderM click1={this.handleShowClick} 
                getTranslation={this.getTranslation} 
                changeLanguage={this.changeLanguage}
                getLanguage={this.getLanguage}/> 

            <Router history={history}>
            <div>
              <Route exact path="/home"     render={(props) => <Home auth={auth} {...props} />} />
              <Route exact path="/signIn"   render={()=><Login getTranslation={this.getTranslation} />}/>
              <Route exact path="/auction"  render={()=><CreateAuction  getTranslation={this.getTranslation} />}/>
              <Route exact path="/auctions/search" render={()=><AuctionsSearch  getTranslation={this.getTranslation} />}/>
              <Route exact path="/detail"   render={()=><AuctionDetails getTranslation={this.getTranslation} />}/>
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} /> 
              }}/>
                      </div>
            </Router>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
  }
}

export default withNamespaces('translation')(App);
