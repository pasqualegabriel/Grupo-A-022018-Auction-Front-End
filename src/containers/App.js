import React, { Component } from 'react';
import '../components/App.css';
import { withNamespaces } from 'react-i18next';
import HeaderM from '../components/Header';
import 'react-notifications/lib/notifications.css'
import { Icon, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'

class App extends Component {

  state = { visible: false }

  
  goTo = (route) => {
    this.props.history.replace(`/${route}`)
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  handleShowClick = () => this.setState({ visible: true })

  handleSidebarHide = () => this.setState({ visible: false })

  getTranslation = (key) => this.props.t(key)

  changeLanguage = (lng) => this.props.i18n.changeLanguage(lng)

  getLanguage = () => this.props.lng

  render() {

    const { isAuthenticated } = this.props.auth;

    const { visible } = this.state

    return (
<div>
          
                {
  !isAuthenticated() && (
      <Button
        id="qsLoginBtn"
        bsStyle="primary"
        className="btn-margin"
        onClick={this.login.bind(this)}
      >
        Log In
      </Button>
    )
}
{
  isAuthenticated() && (
      <Button
        id="qsLogoutBtn"
        bsStyle="primary"
        className="btn-margin"
        onClick={this.logout.bind(this)}
      >
        Log Out
      </Button>
    )
}
</div>
    )
  }
}

export default withNamespaces('translation')(App);


// {
//   !isAuthenticated() && (
//       <Button
//         id="qsLoginBtn"
//         bsStyle="primary"
//         className="btn-margin"
//         onClick={this.login.bind(this)}
//       >
//         Log In
//       </Button>
//     )
// }
// {
//   isAuthenticated() && (
//       <Button
//         id="qsLogoutBtn"
//         bsStyle="primary"
//         className="btn-margin"
//         onClick={this.logout.bind(this)}
//       >
//         Log Out
//       </Button>
//     )
// }
