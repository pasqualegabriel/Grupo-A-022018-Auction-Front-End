import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import { withNamespaces } from 'react-i18next';
import HeaderM from '../components/Header';
import AuctionDetails from '../components/AuctionDetails';
import CreateAuction from '../components/CreateAuction';
import AuctionsSearch from '../components/AuctionsSearch';
import Auctions from '../components/Auctions';
import 'react-notifications/lib/notifications.css'
import Login from './Login'
import PropTypes from 'prop-types'
import Home from './Home'
import {
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    vertical
    visible={visible}
    width='thin'
    heigth='100%'
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
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

class App extends Component {

  state = {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  }

  handleAnimationChange = animation => () =>
    this.setState({ animation, visible: !this.state.visible })

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

  handleDirectionChange = direction => () => this.setState({ direction, visible: false })

  getTranslation = (key) => this.props.t(key)

  changeLanguage = (lng) => {
    this.props.i18n.changeLanguage(lng)
  }

  getLanguage = () => this.props.lng

  render() {

    const { animation, direction, dimmed, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'

    return (
      <div>
        <HeaderM click1={this.handleAnimationChange('push')} 
                getTranslation={this.getTranslation} 
                changeLanguage={this.changeLanguage}
                getLanguage={this.getLanguage}/> 


        <div>
          {/* <img src='https://i.ytimg.com/vi/UcMMA7KKBsk/maxresdefault.jpg' alt="" sizes></img> */}
        </div>
        <Sidebar.Pushable as={Segment}>
          {vertical ? null : (
            <VerticalSidebar animation={animation} direction={direction} visible={visible} />
          )}

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Switch>
              <Route exact path="/home"     render={()=><Home/>}/>
              <Route exact path="/signIn"   render={()=><Login getTranslation={this.getTranslation} />}/>
              <Route exact path="/auction"  render={()=><CreateAuction  getTranslation={this.getTranslation} />}/>
              <Route exact path="/auctions" render={()=><Auctions  getTranslation={this.getTranslation} />}/>
              <Route exact path="/auctions/search" render={()=><AuctionsSearch  getTranslation={this.getTranslation} />}/>
              <Route exact path="/detail"   render={()=><AuctionDetails getTranslation={this.getTranslation} />}/>
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        
      </div>
    );
  }
}

export default withNamespaces('translation')(App);
