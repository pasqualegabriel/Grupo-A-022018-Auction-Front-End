import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import AuctionsList from '../components/AuctionsList'
import Login from './Login'

const styles = {
  textAlign: 'center'
}

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.auctionService = new AuctionService()
  }

  auctionsToFinish = (page, limit) => this.auctionService.getAuctionsToFinish(page, limit)

  recentAuctions = (page, limit) => this.auctionService.getRecentAuctions(page, limit)

  render() {

    const { isAuthenticated } = this.props.auth;

    return (
      <div>
      {
        !isAuthenticated() && (
          <Login auth={this.props.auth} getTranslation={this.props.getTranslation}/>
        )
      }
      {
        isAuthenticated() && (
          <div style={styles}>

            <h2>Subastas por terminar</h2>
            <AuctionsList getAuctions={this.auctionsToFinish}/> 
            <h2>Ultimas publicadas</h2>
            <AuctionsList getAuctions={this.recentAuctions}/> 
  
          </div>
        )
      }
      </div>
    )
  }

}
