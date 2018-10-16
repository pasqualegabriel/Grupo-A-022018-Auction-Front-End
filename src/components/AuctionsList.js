import React from 'react'
import Auction from './Auction.js'

export default ({auctions}) => {

    return ( 
      <div>
        {auctions.map(anAuction => 
          <div key={anAuction.id}>
            <Auction auction={anAuction}/>
          </div>
        )}
      </div>
    )
}
