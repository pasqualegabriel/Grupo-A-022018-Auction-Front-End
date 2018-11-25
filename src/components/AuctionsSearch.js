import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import ListAuction from './ListAuction'
import Pagination from 'semantic-ui-react-button-pagination'
import Login from '../containers/Login'
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
      auctions: [],
      page: 0,
      offset: 0,
      limit: 5,
      totalElements: 100,
      title: localStorage.getItem('search') || '',
      description: ''
    }
  }

  // tick = () => {
  //   this.setAuctionsTitleDescription(this.state.title, this.state.description, this.state.page)
  // }

  // componentDidMount = () => {
  //   this.interval = setInterval(() => this.tick(), 2000);
  // }

  // componentWillUnmount = () => {
  //   clearInterval(this.interval);
  // }

  componentDidMount = () => {
    console.log(this.props.title)
    this.setAuctionsTitleDescription(this.state.title, this.state.description, this.state.page)
  }

  handleClick = offset => {
    const page = offset / this.state.limit
    this.setState({offset, page})
    this.setAuctionsTitleDescription(this.state.title, this.state.description, page)
  }

  handleChange = (ev, {name, value}) => {
    this.setState({ [name]: value })
  }

  setLimit = (ev, {name, value}) => {
    this.setState({limit: parseInt(value), page: 0})
    this.auctionService.getAuctionsTitleDescription(this.state.title, this.state.description, 0, parseInt(value))
    .then(res => {
      const auctions = res.data.content
      const totalElements = res.data.totalElements
      this.setState({ auctions, totalElements })
    }).catch(err => console.log(err))
  }

  setAuctionsTitleDescription = (title, description, page) => {
    this.auctionService.getAuctionsTitleDescription(title, description, page, this.state.limit)
    .then(res => {
      const auctions = res.data.content
      const totalElements = res.data.totalElements
      this.setState({ auctions, totalElements })
    }).catch(err => console.log(err))
  }

  search = () => {
    this.setState({page:0})
    this.setAuctionsTitleDescription(this.state.title, this.state.description, 0)
  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (
      <div>
      {
        !isAuthenticated() && (
          <Login auth={this.props.auth} getTranslation={this.props.getTranslation}/>
        )
      }
      {
        isAuthenticated() && (
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
      </div>
    )
  }

}