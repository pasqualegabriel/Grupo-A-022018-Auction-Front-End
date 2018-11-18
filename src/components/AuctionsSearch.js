import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import ListAuction from './ListAuction'
import Pagination from 'semantic-ui-react-button-pagination';

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.auctionService = new AuctionService()
    this.state = {
      auctions: [] ,
      page: 0,
      totalPages: 1,
      offset: 0,
      limit: 5,
      totalElements: 100
    }
  }

  componentDidMount() {
    this.setAuctions(this.state.page)
  }

  setAuctions(page) {
    this.auctionService.getAuctions(page, this.state.limit)
    .then(res => {
      const auctions = res.data.content
      const totalPages = res.data.totalPages
      const totalElements = res.data.totalElements
      this.setState({ auctions, totalPages, totalElements })
    }).catch(err => console.log(err))
  }

  handleClick(offset) {
    const page = offset / this.state.limit
    this.setState({offset, page})
    this.setAuctions(page)
  }

  render() {

    return (
      <div>
        <ListAuction auctions={this.state.auctions}/> 
        <Pagination
          offset={this.state.offset}
          limit={this.state.limit}
          total={this.state.totalElements}
          onClick={(e, props, offset) => this.handleClick(offset)}
        />
      </div>
    )
  }

}