import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import ListAuction from './ListAuction'
import {getItem} from '../services/LocalStorageService'
import Pagination from 'semantic-ui-react-button-pagination'

const style = {
  height: '100%'
}

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
      totalElements: 100,
      title: getItem('title').title
    }
  }

  componentDidMount = () => {
    console.log(this.state.title)
    this.state.title === '' 
    ? this.setAuctions(this.state.page)
    : this.setAuctionsTitle(this.state.page, this.state.title)
  }

  setAuctions = page => {
    this.auctionService.getAuctions(page, this.state.limit)
    .then(res => {
      const auctions = res.data.content
      const totalPages = res.data.totalPages
      const totalElements = res.data.totalElements
      this.setState({ auctions, totalPages, totalElements })
    }).catch(err => console.log(err))
  }

  setAuctionsTitle = (page, title) => {
    this.auctionService.getAuctionsTitle(title, page, this.state.limit)
    .then(res => {
      const auctions = res.data.content
      const totalPages = res.data.totalPages
      const totalElements = res.data.totalElements
      this.setState({ auctions, totalPages, totalElements })
    }).catch(err => console.log(err))
  }

  handleClick = offset => {
    const page = offset / this.state.limit
    this.setState({offset, page})
    this.state.title === '' ? this.setAuctions(page) : this.setAuctionsTitle(page, this.state.title)
  }

  render() {

    return (
      <div style={style}>
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