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

  setAuctions = () => {
    const finish = this.auctionService.getAuctionsToFinish(0, 15)
    const news = this.auctionService.getRecentAuctions(0, 15)
    Promise.all([finish, news])
    .then(res => {
      const toFinish = res[0].data.content
      const recents = res[1].data.content
      this.setState({ toFinish, recents })
    }).catch(err => console.log(err))
  }

  render() {

    return (
      <div style={styles}>

        <h2>Subastas por terminar</h2>
        <AuctionsList auctions={this.state.toFinish}/> 
        <h2>Ultimas publicadas</h2>
        <AuctionsList auctions={this.state.recents}/> 

      </div>
    )
  }

}
