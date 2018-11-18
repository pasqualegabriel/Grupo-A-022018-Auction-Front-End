import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import AuctionsList from '../components/AuctionsList'

const styles = {
}

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.auctionService = new AuctionService()
    this.state = {
      auctions: [] 
    }
  }

  componentDidMount = () => this.setAuctions()

  setAuctions = async() => {
    this.auctionService.getAuctions()
    .then(response => {
      const auctions = response.data.content;
      this.setState({ auctions });
    })
  }

  render() {

    return (
      <div style={styles}>
        <AuctionsList auctions={this.state.auctions}/> 
        <AuctionsList auctions={this.state.auctions}/> 
      </div>
    )
  }

}
