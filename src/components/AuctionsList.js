import React from 'react'
import Auction from './Auction.js'
import { Item } from 'semantic-ui-react'

export default ({auctions}) => {

    return ( 
      <div class="album py-5 bg-light">
          <div class="row">
      
              {auctions.map(anAuction => 
                  <Auction key={anAuction.id} auction={anAuction}/>
              )}
          </div>
      </div>
    )
}
