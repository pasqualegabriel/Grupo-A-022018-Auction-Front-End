import React from 'react'
import Auction from './Auction.js'
import { Item } from 'semantic-ui-react'

export default ({auctions}) => {

    return ( 
      <Item.Group>
        {auctions.map(anAuction => 
            <Auction key={anAuction.id} auction={anAuction}/>
        )}
      </Item.Group>
    )
}
