import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import ListAuction from './ListAuction'
import {getItem} from '../services/LocalStorageService'
import Pagination from 'semantic-ui-react-button-pagination'
import { Table, Input, Button, Dropdown } from 'semantic-ui-react'

const container = {
  width: 'available',
  height: 'available'
}

const leftpane = {
  width: '30%',
  height: 'available',
  minHeight: '900px',
  float: 'left',
  borderCollapse: 'collapse'
}

const middlepane = {
 width: '70%',
 height: 'available',
 minHeight: '900px',
 float: 'left',
 borderCollapse: 'collapse'
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
      title: getItem('title').title,
      description: ''
    }
  }

  componentDidMount = () => {
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
    if(this.state.title === '' && this.state.description === '') {
      this.setAuctions(page)
    } else if(this.state.title !== '' && this.state.description !== '') {
      this.setAuctionsTitleDescription(this.state.title, this.state.description, page)
    } else this.setAuctionsTitle(page, this.state.title)
  }

  handleChange = (ev, {name, value}) => {
    this.setState({ [name]: value })
  }

  setLimit = (ev, {name, value}) => {
    const page = this.state.offset / parseInt(value)
    this.setState({ [name]: parseInt(value) })
    this.setState({page})
    if(this.state.title === '' && this.state.description === '') {
      this.setAuctions(page)
    } else if(this.state.title !== '' && this.state.description !== '') {
      this.setAuctionsTitleDescription(this.state.title, this.state.description, page)
    } else this.setAuctionsTitle(page, this.state.title)
  }

  setAuctionsTitleDescription = (title, description, page) => {
    this.auctionService.getAuctionsTitleDescription(title, description, page, this.state.limit)
    .then(res => {
      const auctions = res.data.content
      const totalPages = res.data.totalPages
      const totalElements = res.data.totalElements
      this.setState({ auctions, totalPages, totalElements })
    }).catch(err => console.log(err))
  }

  search = () => {
    if(this.state.title === '' && this.state.description === '') {
      this.setAuctions(this.state.page)
    } else if(this.state.title !== '' && this.state.description !== '') {
      this.setAuctionsTitleDescription(this.state.title, this.state.description, this.state.page)
    } else this.setAuctionsTitle(this.state.page, this.state.title)
  }

  render() {

    return (
      <div style={container}>
        <div style={leftpane}>
        <Table celled textAlign='center' >

          <Table.Header>
            <Table.Row>
              <Table.Cell width='6'>Show:</Table.Cell>
              <Table.Cell>
                <Dropdown item text={this.state.limit.toString()} >
                  <Dropdown.Menu >
                  <Dropdown.Item as={Button} value='5' name='limit'
                                  onClick={this.setLimit}>5</Dropdown.Item>
                    <Dropdown.Item as={Button} value='10' name='limit'
                                  onClick={this.setLimit}>10</Dropdown.Item>
                    <Dropdown.Item as={Button} value='15' name='limit'
                                  onClick={this.setLimit}>15</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell width='6'>Title:</Table.Cell>
              <Table.Cell>
                <Input 
                  fluid
                  size='large'
                  name="title"
                  onChange={this.handleChange}
                  placeholder='Title'
                  defaultValue={this.state.title}
                  error={false}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Description:</Table.Cell>
              <Table.Cell>
                <Input 
                  fluid
                  size='large'
                  name="description"
                  onChange={this.handleChange}
                  placeholder='Description'
                  defaultValue={this.state.description}
                  error={false}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

        </Table>

        <Button fluid size='large' onClick={this.search}>
          <h3>Search</h3>
        </Button>

        </div>
        <div style={middlepane}>
          <ListAuction auctions={this.state.auctions}/>
          <Pagination
            offset={this.state.offset}
            limit={this.state.limit}
            total={this.state.totalElements}
            onClick={(e, props, offset) => this.handleClick(offset)}
          />
        </div>
      </div>
    )
  }

}