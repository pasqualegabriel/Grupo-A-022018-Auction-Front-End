import React, { Component } from 'react'
import Popup from "reactjs-popup"
import { Button, Input } from 'semantic-ui-react'

const contentStyle = {
    maxWidth: "600px",
    width: "90%",
    height: '300px',
    padding: '2rem',
    position: 'center',
    top: '10%',
    transform: '40px'
};

export default class FirstOffer extends Component {

    constructor(props){
        super(props)
        this.state = { 
          amount: 0
        }
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
            <Popup
                trigger={
                    <Button primary>
                        <h3>Realizar oferta</h3>
                    </Button>
                }
                modal
                contentStyle={contentStyle}
            >
                {close => (
                <div className="modal">
                    <div className="content">
                    Puedes realizar una oferta 
                    con seguimiento automatico
                    </div>
                    <br/>
                    <div className="actions">
                    <div className="content">
                        <Button primary onClick={() => {
                            this.props.offer()
                            close()
                        }}>
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
                        <Button color='green' onClick={() => {
                            this.props.firstOffer(this.state.amount)
                            close()
                        }}>
                            <h3>Realizar oferta con seguimiento automatico</h3>
                        </Button>
                        </div>
                        <br/>
                    <button
                        className="button"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </button>
                    </div>
                </div>
                )}
            </Popup>
        )
    }
}
