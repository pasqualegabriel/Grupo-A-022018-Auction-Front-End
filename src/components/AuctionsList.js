import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './App.css';
import Auction from './Auction.js'
import Pagination from 'semantic-ui-react-button-pagination'
 
// All items component
// Important! add unique key
const Menu = auctions => auctions.map(anAuction => {
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
    this.state = {
      auctions: [],
      page: 0,
      offset: 0,
      limit: 10,
      totalElements: 100,
      selected: 0
    }
  }

  componentDidMount = () => {
    this.setAuctions(this.state.page, this.state.limit)
  }

  setAuctions = (page, limit) => {
    this.props.getAuctions(page, limit).then(res => {
      const { content: auctions, totalElements } = res.data
      this.setState({ auctions, totalElements })
    }).catch(err => console.log(err))
  }    
  
  onSelect = key => {
    this.setState({ selected: key });
  }

  handleClick = offset => {
    const page = offset / this.state.limit
    this.setState({offset, page})
    this.setAuctions(page, this.state.limit)
  }
 
  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = Menu(this.state.auctions);
 
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
        <Pagination
          offset={this.state.offset}
          limit={this.state.limit}
          total={this.state.totalElements}
          onClick={(e, props, offset) => this.handleClick(offset)}
        />
      </div>
    );
  }
}
