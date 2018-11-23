import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './App.css';
import Auction from './Auction.js'
 
// All items component
// Important! add unique key
const Menu = (auctions) => 
                auctions.map(anAuction => {
                   return ( <Auction key={anAuction.id} auction={anAuction}/> )
                })
 
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};

const st = {
  height: 'available'
}
 
const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
 
export default class AuctionList extends Component {

  constructor(props) {
    super(props)
    this.auctionService = new AuctionService()
    this.state = {
      auctions: [] ,
      page: 0,
      offset: 0,
      limit: 5,
      totalElements: 100,
      selected: 0
    }
  }
  
  onSelect = key => {
    this.setState({ selected: key });
  }
 
  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = Menu(this.props.auctions);
 
    return (
      <div className="App">
        <ScrollMenu
          style={st}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
