import React from 'react'
import Auction from './AuctionItem.js'
import { Item } from 'semantic-ui-react'

export default ({auctions, getTranslation}) => {

    return ( 
        
        <Item.Group divided>
                {auctions.map(anAuction => 
            <Auction key={anAuction.id} auction={anAuction} getTranslation={getTranslation}/>
        )}
        </Item.Group>
    )
}