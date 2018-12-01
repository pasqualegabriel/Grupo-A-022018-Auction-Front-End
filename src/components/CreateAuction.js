import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import Login from '../containers/Login'
import moment from 'moment'
import HeaderM from './Header'
import 'react-datepicker/dist/react-datepicker.css'

const styles = {
    loginStyle: {
        height: '100%',
        width: '500', 
        padding: '1em'
    }
}

const dateStyle = {
  width: '300px'
}

export default class CreateAuction extends Component {

  constructor(props) { 
    super(props);
    this.auctionService = new AuctionService()
    this.state = {
      search: '',
      startDate: moment(),
      endDate: moment(), 
      description: '',
      title: '',
      price: 0,
      address: '',
      photo: ''
    }
  }

  handleChangeStartDate = (event) => {
    this.setState({startDate: event})
  }

  handleChangeEndDate = (event) => {
    this.setState({endDate: event})
  }

  handleChange = (ev, {name, value}) => {
    this.setState({ [name]: value })
  }

  create = event => {
    const profile = JSON.parse(localStorage.getItem('email'))
    const nick = profile.nickname
    const newAuction = {
      emailAuthor: `${nick}@gmail.com`,
      publicationDate: this.state.startDate,
      finishDate: this.state.endDate,
      price: this.state.price,
      title: this.state.title,
      description: this.state.description,
      address: this.state.address,
      photos: this.state.photo
    }
    this.auctionService.auction(newAuction).then(res => console.log(res)).catch(err => console.log(err))
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
          <div>

            <HeaderM  auth={this.props.auth}
                      getTranslation={this.props.getTranslation} 
                      changeLanguage={this.props.changeLanguage}
                      getLanguage={this.props.getLanguage}/> 
            <div className='login-form'>
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
            <Grid textAlign='center' style={styles.loginStyle} verticalAlign='middle' >
              <Grid.Column style={{ maxWidth: 500, backgroundColor: '#e2e2e2' }}>
                
                <Form size='large' >
                  <Segment stacked >
                  <Header as='h2' color='blue' textAlign='center'>
                    Create Auction
                  </Header>
    
                    <Form.Input
                      fluid
                      name="title"
                      onChange={this.handleChange}
                      icon='tags'
                      iconPosition='left'
                      placeholder='Title'
                    />
    
                    <Form.Input
                      fluid
                      name="description"
                      onChange={this.handleChange}
                      icon='content'
                      iconPosition='left'
                      placeholder='Description'
                    />
    
                    <Form.Input
                      fluid
                      name="price"
                      onChange={this.handleChange}
                      icon='money bill alternate'
                      iconPosition='left'
                      placeholder='Initial Price'
                      error={false}
                    />
    
                    <Form.Group widths='equal'>
                      <Form.Field label='Publication Date' />
                      <Form.Field label='Finish Date'  />
                    </Form.Group>
    
                    <Form.Group widths='equal'>
                    <div style={dateStyle}>
                      <DatePicker
                        label='First name'
                        selected={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                      />
                    </div>
                      <div style={dateStyle}>
                        <DatePicker
                          selected={this.state.endDate}
                          onChange={this.handleChangeEndDate}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="LLL"
                          timeCaption="time"
                        />
                      </div>
                    </Form.Group>

                    <Form.Input
                      fluid
                      name="address"
                      onChange={this.handleChange}
                      icon='building outline'
                      iconPosition='left'
                      placeholder='Address'
                    />
    
                    <Form.Input
                      fluid
                      name="photo"
                      onChange={this.handleChange}
                      icon='photo'
                      iconPosition='left'
                      placeholder='Add Photo Link'
                    />
    
                    <Button color='blue' onClick={this.create} fluid size='large' >
                      Create
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        </div>
        )
      }
      </div>
    )
  }

}

/*
"emailAuthor": "user@gmail.com",
    "publicationDate": "2018-09-25T14:13:30",
    "finishDate": "2018-09-28T14:13:30",
    "initialFinishDate": "2018-09-28T14:13:30",
    "price": 100,
    "automaticOfferAmount": 200,
    "title": "PS4 God of War",
    "description": "The goddess Athena tasks Kratos with killing Ares.",
    "address": null,
    "photos": null,
*/
