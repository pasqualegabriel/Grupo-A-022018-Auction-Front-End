import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import AuctionService from '../services/AuctionService'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

export default class CreateAuction extends Component {

  constructor(props) { 
    super(props);
    this.auctionService = new AuctionService()
    this.state = {
      search: ''
    }
  }

  handleChange = (event) => {
    this.setState({search: event.target.value})
  }

  render() {

    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='First name' placeholder='First name' error />
                <Form.Input fluid label='Last name' placeholder='Last name' />
            </Form.Group>
            <Form.Select options={options} placeholder='Gender' error />
            <Form.Checkbox label='I agree to the Terms and Conditions' error />
        </Form>
    )
  }

}
