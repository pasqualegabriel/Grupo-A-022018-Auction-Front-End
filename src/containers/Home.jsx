import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import AuctionsList from '../components/AuctionsList'

const styles = {
  textAlign: 'center'
}

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.auctionService = new AuctionService()
    this.state = {
      toFinish: [],
      recents: []
    }
  }

  componentDidMount = () => this.setAuctions()
  
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  setAuctions = async() => {
    this.auctionService.getAuctions(0, 15)
    .then(res => {
      const toFinish = res.data.content
      this.setState({ toFinish, recents: toFinish })
    }).catch(err => console.log("aaaa"))

    // const finish = this.auctionService.getAuctionsToFinish(0, 15)
    // const news = this.auctionService.getRecentAuctions(0, 15)
    // Promise.all([finish, news])
    // .then(res => {
    //   const toFinish = res[0].data.content
    //   const recents = res[1].data.content
    //   this.setState({ toFinish, recents })
    // })
  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (
      <div style={styles}>
      {
        !isAuthenticated() && (
            <button
              id="qsLoginBtn"
              onClick={this.login.bind(this)}
            >
              Log In
            </button>
          )
      }
      {
        isAuthenticated() && (
            <button
              id="qsLogoutBtn"
              onClick={this.logout.bind(this)}
            >
              Log Out
            </button>
          )
      }

        <h2>Subastas por terminar</h2>
        <AuctionsList auctions={this.state.toFinish}/> 
        <h2>Ultimas publicadas</h2>
        <AuctionsList auctions={this.state.recents}/> 

      </div>
    )
  }

}
