import React from 'react'
import Auction from './AuctionItem.js'
import { Item } from 'semantic-ui-react'

export default ({auctions}) => {

    return ( 
        
            <Item.Group divided width='80%'>
                    {auctions.map(anAuction => 
                <Auction key={anAuction.id} auction={anAuction}/>
            )}
            </Item.Group>
    )
}