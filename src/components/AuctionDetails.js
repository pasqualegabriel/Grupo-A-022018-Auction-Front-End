import React, { Component } from 'react'
import {getItem} from '../services/LocalStorageService'
import { Table, Button, Label } from 'semantic-ui-react'
import 'moment/locale/es'
import moment from 'moment'

const container = {
  width: 'available',
  height: 'available'
}

const leftpane = {
  width: '55%',
  // minWidth: '1550px',
  height: 'available',
  minHeight: '900px',
  float: 'left',
  // backgroundColor: 'rosybrown',
  borderCollapse: 'collapse'
}

const middlepane = {
 width: '45%',
//  minWidth: '800px',
 height: 'available',
 minHeight: '900px',
 float: 'left',
//  backgroundColor: 'royalblue',
 borderCollapse: 'collapse'
}

const titleS = {
  textAlign: 'center'
}

export default class App extends Component {
  
  constructor(){
    super()
    this.state = { 
      auction: {},
      bidders: []
    }
  }

  componentDidMount = () => this.setAuction()

  setAuction = () => {
    const auction = getItem('auction')
    const bidders = auction.bidders
    this.setState({
      auction,
      bidders
    })
  }

  render() {

    return (
      <div style={container}>
        <div style={leftpane}>
          <div style={titleS}>
            <h1>{this.state.auction.title}</h1>
            <h3>{this.state.auction.description}</h3>
            <img alt='' src='https://www.crystalcommerce.com/wp-content/uploads/2018/09/square_gow4-notxt.jpg'/>
            <h3>Finaliza {moment(this.state.auction.finishDate).locale('es').endOf('hour').fromNow()}</h3> 
          </div>
        </div>
        <div style={middlepane}>

          <Table celled textAlign='center' >

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Ultimo tramo</Table.HeaderCell>
                <Table.HeaderCell>
                <Label color='teal'>
                  <h2>$ {this.state.auction.price}</h2>
                </Label>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Tramo 10 - $ 100</Table.Cell>
                <Table.Cell>
                  <Button primary>
                    <h3>Realizar offerta</h3>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>

          </Table>

          <Table celled textAlign='center' >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='5'><h2>Avance de la subasta</h2></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {this.state.bidders.map(b => 
              <Table.Body key={b.id}>
                <Table.Row>
                  <Table.Cell>{b.author}</Table.Cell>
                  <Table.Cell>Tramo {b.id}</Table.Cell>
                  <Table.Cell>$ {b.price}</Table.Cell>
                  <Table.Cell>{moment(b.publicationDate).calendar()}</Table.Cell>
                  <Table.Cell>{moment(b.publicationDate).format('LT')}</Table.Cell>
                </Table.Row>
              </Table.Body>
            )}
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan='5'>{this.state.bidders.length} postores en la subasta</Table.Cell>
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
