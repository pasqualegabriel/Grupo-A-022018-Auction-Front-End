import React, { Component } from 'react'
import { getItem } from '../services/LocalStorageService'
import { Table, Button, Label } from 'semantic-ui-react'
import 'moment/locale/es'
import moment from 'moment'
import AuctionService from '../services/AuctionService'
import FirstOffer from './FirstOffer'

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
  
  constructor(){
    super()
    this.auctionService = new AuctionService()
    this.state = { 
      auction: {},
      bidders: []
    }
  }

  componentDidMount = () => this.setAuction()

  setAuction = () => {
    const anAuction = getItem('auction')
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

  offer = () => {
    const { id } = this.state.auction;
    const profile = JSON.parse(localStorage.getItem('email'))
    const nick = profile.nickname
    this.auctionService.offer(id, `${nick}@gmail.com`)
      .then(res => this.setAuction())
      .catch(err => console.log(err))
  }

  firstOffer = amount => {
    const { id } = this.state.auction
    const profile = JSON.parse(localStorage.getItem('email'))
    const nick = profile.nickname
    this.auctionService.firstOffer(id, `${nick}@gmail.com`, amount)
      .then(res => this.setAuction())
      .catch(err => console.log(err))
  }

  render() {

    const { auction, bidders } = this.state

    const AutomaticOffer = () => { 
      if(bidders.length === 0) {
        return (
          <Table.Body>
            <Table.Row>
              <Table.Cell>Tramo {bidders.length + 1} - $ {parseInt((auction.price * 5 / 100) + auction.price)}</Table.Cell>
              <Table.Cell>
                <FirstOffer offer={this.offer} firstOffer={this.firstOffer}/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )
      } else {
        return (
          <Table.Body>
            <Table.Row>
              <Table.Cell>Tramo {bidders.length + 1} - $ {parseInt((auction.price * 5 / 100) + auction.price)}</Table.Cell>
              <Table.Cell>
                <Button primary onClick={this.offer}>
                  <h3>Realizar offerta</h3>
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )
      }
    }

    return (
      <div style={container}>
        <div style={leftpane}>
          <div style={titleS}>
            <h1>{auction.title}</h1>
            <h3>{auction.description}</h3>
            <img alt='' style={image} src={auction.photos}/>
            <h3>Finaliza {moment(auction.finishDate).locale('es').endOf('hour').fromNow()}</h3> 
          </div>
        </div>
        <div style={middlepane}>

          <Table celled textAlign='center' >

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Ultimo tramo</Table.HeaderCell>
                <Table.HeaderCell>
                <Label color='teal'>
                  <h2>$ {auction.price}</h2>
                </Label>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <AutomaticOffer/>

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
                  <Table.Cell>Tramo {i + 1}</Table.Cell>
                  <Table.Cell>$ {b.price}</Table.Cell>
                  <Table.Cell>{moment(b.publicationDate).calendar()}</Table.Cell>
                  <Table.Cell>{moment(b.publicationDate).format('LT')}</Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan='5'>{bidders.length} postores en la subasta</Table.Cell>
                </Table.Row>
              </Table.Body>
          </Table>
        </div>
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