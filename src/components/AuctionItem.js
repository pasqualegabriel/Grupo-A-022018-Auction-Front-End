import React from 'react'
import {setItem} from '../services/LocalStorageService'
import { Item, Button, Icon } from 'semantic-ui-react'

export default ({auction}) => (
    <Item >
      <Item.Image src='https://www.crystalcommerce.com/wp-content/uploads/2018/09/square_gow4-notxt.jpg' />

      <Item.Content>
        <Item.Header as='a'>{auction.title}</Item.Header>
        <Item.Meta>
          <span className='cinema'>{auction.emailAuthor}</span>
        </Item.Meta>
        <Item.Description>{auction.description}</Item.Description>
        <Item.Extra>
        <Button primary floated='right' onClick={() => {
            setItem('auction', auction)
            window.location.pathname = '/detail'
        }}>
            Details
            <Icon name='right chevron' />
        </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
)

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