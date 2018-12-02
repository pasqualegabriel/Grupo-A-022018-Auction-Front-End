import React from 'react'
import Auction from './AuctionItem.js'
import { Item } from 'semantic-ui-react'

export default ({auctions, getTranslation, setEmail2}) => {

    return ( 
        
        <Item.Group divided>
                {auctions.map(anAuction => 
            <Auction key={anAuction.id} auction={anAuction} translation={getTranslation} setEmail2={setEmail2}/>
        )}
        </Item.Group>
    )
}