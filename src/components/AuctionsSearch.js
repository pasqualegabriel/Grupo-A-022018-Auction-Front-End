import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import ListAuction from './ListAuction'
import Pagination from 'semantic-ui-react-button-pagination'
import Login from '../containers/Login'
import { Table, Input, Button, Dropdown } from 'semantic-ui-react'
import HeaderM from './Header'

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
      description: '',
      email: localStorage.getItem('search-email') || ''
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
    this.setAuctionsTitleDescription(this.state.title, this.state.description, this.state.email, this.state.page)
  }

  handleClick = offset => {
    const page = offset / this.state.limit
    this.setState({offset, page})
    this.setAuctionsTitleDescription(this.state.title, this.state.description, this.state.email, page)
  }

  handleChange = (ev, {name, value}) => {
    this.setState({ [name]: value })
  }

  setLimit = (ev, {name, value}) => {
    this.setState({limit: parseInt(value), page: 0})
    this.auctionService.getAuctionsTitleDescriptionEmail(this.state.title, this.state.description, this.state.email, 0, parseInt(value))
    .then(res => {
      const auctions = res.data.content
      const totalElements = res.data.totalElements
      this.setState({ auctions, totalElements })
    }).catch(err => console.log(err))
  }

  setAuctionsTitleDescription = (title, description, email, page) => {
    this.auctionService.getAuctionsTitleDescriptionEmail(title, description, email, page, this.state.limit)
    .then(res => {
      const auctions = res.data.content
      const totalElements = res.data.totalElements
      this.setState({ auctions, totalElements })
    }).catch(err => console.log(err))
  }

  search = () => {
    this.setState({page:0})
    this.setAuctionsTitleDescription(this.state.title, this.state.description, this.state.email, 0)
  }

  setEmail2 = email => {
    this.setState({email})
    this.setAuctionsTitleDescription(this.state.title, this.state.description, email, this.state.page)
  }

  render() {

    const { isAuthenticated } = this.props.auth;
    const { getTranslation: t } = this.props;

    return (
      <div>
      {
        !isAuthenticated() && (
          <Login auth={this.props.auth} getTranslation={this.props.getTranslation} changeLanguage={this.props.changeLanguage}/>
        )
      }
      {
        isAuthenticated() && (
          <div style={container}>

            <HeaderM  auth={this.props.auth}
                      getTranslation={this.props.getTranslation} 
                      changeLanguage={this.props.changeLanguage}
                      getLanguage={this.props.getLanguage}/> 

            <div style={leftpane}>
            <Table celled textAlign='center' >

              <Table.Header>
                <Table.Row>
                  <Table.Cell width='6'>{t('show')}:</Table.Cell>
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
                  <Table.Cell width='6'>{t('title-search')}:</Table.Cell>
                  <Table.Cell>
                    <Input 
                      fluid
                      size='large'
                      name="title"
                      onChange={this.handleChange}
                      placeholder={t('title-search')}
                      defaultValue={this.state.title}
                      error={false}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>{t('description')}:</Table.Cell>
                  <Table.Cell>
                    <Input 
                      fluid
                      size='large'
                      name="description"
                      onChange={this.handleChange}
                      placeholder={t('description')}
                      defaultValue={this.state.description}
                      error={false}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell>
                    <Input 
                      fluid
                      size='large'
                      name="email"
                      onChange={this.handleChange}
                      placeholder='Email'
                      defaultValue={this.state.email}
                      error={false}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>

            </Table>

            <Button fluid size='large' onClick={this.search}>
              <h3>{t('search')}</h3>
            </Button>

            </div>
            <div style={middlepane}>
              <ListAuction auctions={this.state.auctions} getTranslation={t} setEmail2={this.setEmail2}/>
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