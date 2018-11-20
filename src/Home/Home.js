import React, { Component } from 'react';
import AuctionService from '../services/AuctionService'

class Home extends Component {
  
  constructor(){
    super()
    this.auctionService = new AuctionService()
    this.state = { 
      auction: {},
      bidders: []
    }
  }
  login() {
    this.props.auth.login();
  }

  algo = () => {
    this.auctionService.getAuction(anAuction.id)
    .then(res => {
      const auction = res.data
      const bidders = auction.bidders
      this.setState({
        auction,
        bidders
      })
    }).catch(err => console.log(err))
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in!
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  href='http://localhost:3000/'
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
dkfjdlkfjaslkñ
        {this.state.auction.price}

      </div>
    );
  }
}

export default Home;
