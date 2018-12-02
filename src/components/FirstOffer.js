import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'
import AuctionService from '../services/AuctionService'
import Login from '../containers/Login'
import HeaderM from './Header'

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
        const nick = profile ? profile.nickname : ''
        this.auctionService.offer(id, `${nick}@gmail.com`)
            .then(() => window.location.pathname = '/detail')
            .catch(err => console.log(err))
    }
    
    firstOffer = () => {
        const id = JSON.parse(localStorage.getItem('firstOffer')).id
        const profile = JSON.parse(localStorage.getItem('email'))
        const nick = profile ? profile.nickname : ''
        this.auctionService.firstOffer(id, `${nick}@gmail.com`, this.state.amount)
            .then(() => window.location.pathname = '/detail')
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

        const { isAuthenticated } = this.props.auth;

        return (
            <div>
            {
                !isAuthenticated() && (
                    <Login auth={this.props.auth} getTranslation={this.props.getTranslation}/>
                )
            }
            {
                isAuthenticated() && (
                    <div className="modal">

                    <HeaderM  auth={this.props.auth}
                              getTranslation={this.props.getTranslation} 
                              changeLanguage={this.props.changeLanguage}
                              getLanguage={this.props.getLanguage}/> 
                        <div className="content">
                            {this.props.getTranslation('titleAutomatic')}
                        </div>
                        <br/>
                        <div className="actions">
                        <div className="content">
                            <Button primary onClick={this.offer}>
                                <h3>{this.props.getTranslation('offer')}</h3>
                            </Button>
                            </div>
                            <br/>
                            <div>
                            <Input 
                                fluid
                                name="amount"
                                onChange={this.handleChange}
                                placeholder={this.props.getTranslation('amountFirstOffer')}
                                error={false}
                            />
                            </div>
                            <br/>
                            <div className="content">
                            <Button color='green' onClick={this.firstOffer}>
                                <h3>{this.props.getTranslation('automatic')}</h3>
                            </Button>
                            </div>
                            <br/>
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
}
