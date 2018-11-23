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
  }

  auctionsToFinish = (page, limit) => this.auctionService.getAuctionsToFinish(page, limit)
    .then(res => {
      const { content: auctions, totalElements } = res.data
      return { auctions, totalElements }
    }).catch(err => console.log(err))

  recentAuctions = (page, limit) => this.auctionService.getRecentAuctions(page, limit)
    .then(res => {
      const { content: auctions, totalElements } = res.data
      return { auctions, totalElements }
    }).catch(err => console.log(err))

  render() {

    return (
      <div style={styles}>

        <h2>Subastas por terminar</h2>
        <AuctionsList getAuctions={this.auctionsToFinish}/> 
        <h2>Ultimas publicadas</h2>
        <AuctionsList getAuctions={this.recentAuctions}/> 

      </div>
    )
  }

}
