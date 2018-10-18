import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import {getItem} from '../services/LocalStorageService'

export default class App extends Component {
  
  constructor(){
    super()
    this.auctionService = new AuctionService()
    this.state = { 
      auction: ""
    }
  }

//   componentDidMount = () => this.setAuction()

//   setAuction = () => {
//     const auctionId = getItem('auction')
//     const auction = this.auctionService.getAuction(auctionId)
//     this.setState({
//       auction
//     })
//   }

  render() {
    return (
      <div>
          {getItem('auction')}
      </div>
    );
  }
}
