import React, { Component } from 'react'
import {getItem} from '../services/LocalStorageService'

export default class App extends Component {
  
  constructor(){
    super()
    this.state = { 
      auction: {},
      bidders: []
    }
  }

  componentDidMount = () => this.setAuction()

  setAuction = () => {
    const auction = getItem('auction')
    const bidders = auction.bidders
    this.setState({
      auction,
      bidders
    })
  }

  render() {
    return (
      <div>
          {this.state.auction.emailAuthor}
          {this.state.bidders.map(b => 
            <div key={b.id}>
              <h1>{b.author}</h1>
            </div>
          )}
      </div>
    );
  }
}
