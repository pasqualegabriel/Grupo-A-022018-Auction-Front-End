import React, { Component } from 'react'
import { getItem } from '../services/LocalStorageService'
import { Table, Button, Label } from 'semantic-ui-react'
import 'moment/locale/es'
import moment from 'moment'
import AuctionService from '../services/AuctionService'
import AuctionsList from './AuctionsList'
import HeaderM from './Header'
import 'react-notifications/lib/notifications.css'
import {NotificationContainer, NotificationManager} from 'react-notifications'

const container = {
  width: 'available',
  height: 'available'
}

const leftpane = {
  width: '55%',
  height: 'available',
  minHeight: '900px',
  float: 'left',
  borderCollapse: 'collapse'
}

const middlepane = {
  width: '45%',
  textAlign: 'center',
  height: 'available',
  minHeight: '900px',
  float: 'left',
  borderCollapse: 'collapse'
}

const titleS = {
  textAlign: 'center'
}

const image = {
  width: '100%',
  height: '100%'
}

export default class App extends Component {
  
  constructor(props){
    super(props)
    this.auctionService = new AuctionService()
    this.state = { 
      auction: {},
      bidders: [],
      firstBidders: [],
      res: moment().format(),
      auctions: [],
      usersName: this.getUsersNames()
    }
  }

  tick = () => {
    this.setAuction()
  }

  componentDidMount = () => {
    this.interval = setInterval(() => this.tick(), 1000);
    this.notifications()
    this.setAuction()
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  notificationRegisterSuccess = (title, message) => {
    NotificationManager.success(message, title)
  }

  notificationRegisterError = (title, message) => {
    NotificationManager.error(message, title, 3000, () => {
      alert('callback')
    })
  }

  notifications = () => {
    const notifies = JSON.parse(localStorage.getItem('notify'))
    const is = notifies ? notifies.is : notifies
    if (is) {
      const {title, message, type} = notifies
      notifies.is = false
      localStorage.setItem('notify', JSON.stringify(notifies))
      if(type === 'success') {
        this.notificationRegisterSuccess(title, message)
      }
      // if(type === 'error'){
      //   this.notificationRegisterError(title, message)
      // }
    }
  }

  convert = ms => {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    // return h + ':' + m + ':' + s;
    const hr = h === 0 ? '' : h < 10 ? `0${h}:` : `${h}:`
    const mr = m === 0 ? '' : m < 10 ? `0${m}:` : `${m}:`
    const sr = s < 10 ? `0${s}` : `${s}`
    return hr + mr + sr
  }

  setAuction = () => {
    const anAuction = getItem('auction')
    this.auctionService.getAuction(anAuction.id)
    .then(result => {
      const now = moment()
      const auction = result.data
      const bidders = auction.bidders
      const firstBidders = auction.firstBidders
      const pd = moment(auction.publicationDate)
      const fd = moment(auction.finishDate)
      const diff = fd.diff(now)
      const diff2 = pd.diff(now)
      const res = now > fd 
                  ? 'Finalizado' 
                  : pd > now 
                    ? `Comienza en ${this.convert(diff2)}` 
                    : `Finaliza en ${this.convert(diff)}`
      // `Finaliza ${fd.fromNow()}`
      const usersName2 = [auction.emailAuthor, auction.emailAuthor, auction.emailAuthor]
      const authors = bidders.map(b => b.author)
      const usersName = authors.length < 3 ? authors.concat(usersName2) : authors
      this.setState({
        auction,
        bidders,
        firstBidders,
        res,
        usersName
      })
    }).catch(err => console.log(err))
  }

  getUsersNames = () => {
    const auction = getItem('auction')
    const authors = auction.bidders.map(b => b.author)
    const usersName = authors.length < 3 ? authors.concat(['', '', '']) : authors
    return usersName
  }

  getAuthor = () => {
    const profile = JSON.parse(localStorage.getItem('email'))
    const nick = profile ? profile.nickname : ''
    return `${nick}@gmail.com`
  }

  offer = () => {
    const { id } = this.state.auction;
    this.auctionService.offer(id, this.getAuthor())
      .then(() => this.setAuction())
      .catch(err => console.log(err))
  }

  firstOffer = amount => {
    const { id } = this.state.auction
    this.auctionService.firstOffer(id, this.getAuthor(), amount)
      .then(() => this.setAuction())
      .catch(err => console.log(err))
  }

  fO = () => {
    localStorage.setItem('firstOffer', JSON.stringify({ id: this.state.auction.id }))
    window.location.pathname = '/firstOffer'
  }

  getAuctionsUsers = (page, limit) => this.auctionService.getAuctionsUsers(this.state.usersName, page, limit)

  edit = () => {
    const { auction } = this.state
    const anAuction =   {
      id: auction.id,
      startDate: auction.publicationDate,
      endDate: auction.finishDate,
      description: auction.description,
      title: auction.title,
      price: auction.price,
      address: auction.address,
      photo: auction.photos,
      showTitle: 'Update Auction',
      confirm: 'Update',
      is: 'update'
    }
    localStorage.setItem('auction-create', JSON.stringify(anAuction))
    window.location.pathname = '/auction'
  }

  // addNotification = (title, message, type) => {
  //   this.notificationDOMRef.current.addNotification({
  //     title,
  //     message,
  //     type, //"success"
  //     insert: "top",
  //     container: "top-right",
  //     animationIn: ["animated", "fadeIn"],
  //     animationOut: ["animated", "fadeOut"],
  //     dismiss: { duration: 2000 },
  //     dismissable: { click: true }
  //   });
  // }

  render() {

    const { auction, bidders, firstBidders } = this.state;
    const { isAuthenticated } = this.props.auth;

    const AutomaticOffer = () => { 
      if(!firstBidders.some(b => b.author === this.getAuthor())) {
        return (
          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.props.getTranslation('stretch')} {bidders.length + 1} - $ {parseInt((auction.price * 5 / 100) + auction.price)}</Table.Cell>
              <Table.Cell>
                {/* <FirstOffer offer={this.offer} firstOffer={this.firstOffer} fO={this.fO}/> */}
                <Button primary onClick={this.fO}>
                  <h3>{this.props.getTranslation('offer')}</h3>
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )
      } else {
        return (
          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.props.getTranslation('stretch')} {bidders.length + 1} - $ {parseInt((auction.price * 5 / 100) + auction.price)}</Table.Cell>
              {/* Tramo {bidders.length + 1} - $ {parseInt((auction.price * 5 / 100) + auction.price)} */}
              <Table.Cell>
                <Button primary onClick={this.offer}>
                  <h3>{this.props.getTranslation('offer')}</h3>
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )
      }
    }

    return (
      <div>
        <NotificationContainer/>
      {
        isAuthenticated() && (
          <div style={container}>

            <HeaderM  auth={this.props.auth}
                      getTranslation={this.props.getTranslation} 
                      changeLanguage={this.props.changeLanguage}
                      getLanguage={this.props.getLanguage}/> 
            <div style={leftpane}>
              <div style={titleS}>
                <h1>{auction.title}</h1>
                <h3>{auction.description}</h3>
                <img alt='' style={image} src={auction.photos}/>
                <h4>{this.props.getTranslation('other-users')}</h4>
                <AuctionsList getAuctions={this.getAuctionsUsers} getTranslation={this.props.getTranslation}/> 
              </div>
            </div>
            <div style={middlepane}>
            <Table celled textAlign='center' >
              <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell><h3>{this.state.res}</h3> </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>

              <Table celled textAlign='center' >

                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>{this.props.getTranslation('last-stretch')}</Table.HeaderCell>
                    <Table.HeaderCell>
                    <Label color='teal'>
                      <h2>$ {auction.price}</h2>
                    </Label>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                {
                  moment(this.state.auction.publicationDate) <= moment() &&
                  moment(this.state.auction.finishDate) >= moment() &&
                  this.state.auction.emailAuthor !== this.getAuthor() && (
                    <AutomaticOffer/>
                  )
                }

                {
                  moment(this.state.auction.finishDate) >= moment() &&
                  this.state.auction.emailAuthor === this.getAuthor() && (
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Editar subasta</Table.Cell>
                        <Table.Cell>
                          <Button primary onClick={this.edit}>
                            <h3>Editar</h3>
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  )
                }

              </Table>

              <Table celled textAlign='center' >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='5'><h2>Avance de la subasta</h2></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {bidders.map((b, i) => 
                  <Table.Body key={b.id}>
                    <Table.Row>
                      <Table.Cell>{b.author}</Table.Cell>
                      <Table.Cell>{this.props.getTranslation('stretch')} {i + 1}</Table.Cell>
                      <Table.Cell>$ {b.price}</Table.Cell>
                      <Table.Cell>{moment(b.publicationDate).calendar()}</Table.Cell>
                      {/* <Table.Cell>{moment(b.publicationDate).format('LT')}</Table.Cell> */}
                    </Table.Row>
                  </Table.Body>
                )}
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell colSpan='5'>{bidders.length} {this.props.getTranslation('bidders-auction')}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
              </Table>
            </div>
          </div>
        )
      }
    
      </div>
    );
  }
}

/*
--auction--
automaticOfferAmount: 200
bidders: (3) [{…}, {…}, {…}]
currentState: "COMPLETED"
description: "The goddess Athena tasks Kratos with killing Ares."
emailAuthor: "user@gmail.com"
finishDate: "2018-09-28T14:13:30"
finished: true
id: 76
inProgress: false
initialFinishDate: "2018-09-28T14:13:30"
photos: null
price: 100
publicationDate: "2018-09-25T14:13:30"
title: "PS4 God of War"
--offer--
auction: null
author: "user2@gmail.com"
id: 77
price: 200
publicationDate: "2018-09-28T14:13:30
*/



// function Container(props){
//   return (
//     <div className="container">
//       {props.children}
//     </div>
//   )
// }