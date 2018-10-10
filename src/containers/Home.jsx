import React, { Component } from 'react';
import AuctionService from '../services/AuctionService.js'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.auctionService = new AuctionService()
  }

  //auctions = async() => this.auctionService.getAuctions()

  render() {

    return (
      <div>
        <h2>hola</h2>
      </div>
    )
  }

}