import React, { Component } from 'react'
// import Popup from "reactjs-popup"
import { Button, Input } from 'semantic-ui-react'
import AuctionService from '../services/AuctionService'

// const contentStyle = {
//     maxWidth: "600px",
//     width: "90%",
//     height: '300px',
//     padding: '2rem',
//     position: 'center',
//     top: '10%',
//     transform: '40px'
// };

export default class FirstOffer extends Component {

    constructor(props){
        super(props)
        this.auctionService = new AuctionService()
        this.state = { 
            amount: 0
        }
    }

    offer = () => {
        const id = JSON.parse(localStorage.getItem('firstOffer')).id
        const profile = JSON.parse(localStorage.getItem('email'))
        const nick = profile.nickname
        this.auctionService.offer(id, `${nick}@gmail.com`)
            .then(() => window.location.pathname = '/auctions/search')
            .catch(err => console.log(err))
    }
    
    firstOffer = () => {
        const id = JSON.parse(localStorage.getItem('firstOffer')).id
        const profile = JSON.parse(localStorage.getItem('email'))
        const nick = profile.nickname
        this.auctionService.firstOffer(id, `${nick}@gmail.com`, this.state.amount)
            .then(() => window.location.pathname = '/auctions/search')
            .catch(err => console.log(err))
    }

    setAmount = amount => {
        this.setState({
            amount
        })
    }

    handleChange = (ev, {name, value}) => {
        this.setAmount(value)
    }

    render() {
        return (
            // <Popup
            //     trigger={
            //         <Button primary>
            //             <h3>Realizar oferta</h3>
            //         </Button>
            //     }
            //     modal
            //     contentStyle={contentStyle}
            // >
            //     {close => (
                <div className="modal">
                    <div className="content">
                    Puedes realizar una oferta 
                    con seguimiento automatico
                    </div>
                    <br/>
                    <div className="actions">
                    <div className="content">
                        <Button primary onClick={this.offer}>
                            <h3>Realizar oferta</h3>
                        </Button>
                        </div>
                        <br/>
                        <div>
                        <Input 
                            fluid
                            name="amount"
                            onChange={this.handleChange}
                            placeholder='Amount'
                            error={false}
                        />
                        </div>
                        <br/>
                        <div className="content">
                        <Button color='green' onClick={this.firstOffer}>
                            <h3>Realizar oferta con seguimiento automatico</h3>
                        </Button>
                        </div>
                        <br/>
                    </div>
                </div>
            //     )}
            // </Popup>
        )
    }
}
