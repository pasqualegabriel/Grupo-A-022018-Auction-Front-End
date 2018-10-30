import React from 'react'
import Auction from './Auction.js'
import { List } from 'semantic-ui-react'

const styles = {
    margin: 'auto',
    marginLeft: '40px',
    padding: '5em', 
    width: '100%'
}

export default ({auctions}) => {

    return ( 
        <List horizontal relaxed style={styles}>
                  {auctions.map(anAuction => 
            <Auction key={anAuction.id} auction={anAuction}/>
        )}
        </List>


    )
}