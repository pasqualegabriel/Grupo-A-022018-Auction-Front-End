import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import Login from '../containers/Login'
import HeaderM from './Header'
import 'moment/locale/es'
import moment from 'moment'
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
      id: JSON.parse(localStorage.getItem('auction-create')).id,
      startDate: moment(JSON.parse(localStorage.getItem('auction-create')).startDate),
      endDate: moment(JSON.parse(localStorage.getItem('auction-create')).endDate),
      description: JSON.parse(localStorage.getItem('auction-create')).description,
      title: JSON.parse(localStorage.getItem('auction-create')).title,
      price: JSON.parse(localStorage.getItem('auction-create')).price,
      address: JSON.parse(localStorage.getItem('auction-create')).address,
      photo: JSON.parse(localStorage.getItem('auction-create')).photo,
      showTitle: JSON.parse(localStorage.getItem('auction-create')).showTitle,
      confirm: JSON.parse(localStorage.getItem('auction-create')).confirm,
      is: JSON.parse(localStorage.getItem('auction-create')).is,
      startDate1: moment(JSON.parse(localStorage.getItem('auction-create')).startDate),
      startDate2: moment(JSON.parse(localStorage.getItem('auction-create')).startDate)
    }
    console.log(moment(this.state.startDate1).locale(this.props.getLanguage()).format('ll'))
    console.log(moment().locale(this.props.getLanguage()).format('ll'))
  }

  handleChangeStartDate = (event) => {
    const startDate1 = moment(event).subtract(1, 'days')
    console.log(moment(event).format('ll'))
    console.log(moment().locale(this.props.getLanguage()).add(1, 'days').format('ll'))
    this.setState({startDate: event, startDate1})
  }

  handleChangeEndDate = (event) => {
    const startDate2 = moment(event).subtract(2, 'days')
    this.setState({endDate: event, startDate2})
  }

  handleChange = (ev, {name, value}) => {
    this.setState({ [name]: value })
  }

  create = () => {
    const profile = JSON.parse(localStorage.getItem('email'))
    const nick = profile ? profile.nickname : ''
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
    if (this.state.is === 'create') {
      this.auctionService.auction(newAuction).then(res => console.log(res)).catch(err => console.log(err))
    } 
    if (this.state.is === 'update') { 
      newAuction.id = this.state.id
      this.auctionService.update(newAuction).then(res => console.log(res)).catch(err => console.log(err))
    }
    window.location.pathname = '/home'
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
                    {this.state.showTitle}
                  </Header>
    
                    <Form.Input
                      fluid
                      name="title"
                      onChange={this.handleChange}
                      icon='tags'
                      iconPosition='left'
                      placeholder='Title'
                      defaultValue={this.state.title}
                      error={this.state.title.length < 5 || this.state.title.length > 50}
                    />
    
                    <Form.Input
                      fluid
                      name="description"
                      onChange={this.handleChange}
                      icon='content'
                      iconPosition='left'
                      placeholder='Description'
                      defaultValue={this.state.description}
                      error={this.state.description.length < 10 || this.state.description.length > 500}
                    />
    
                    <Form.Input
                      fluid
                      name="price"
                      onChange={this.handleChange}
                      icon='money bill alternate'
                      iconPosition='left'
                      placeholder='Initial Price'
                      defaultValue={this.state.price}
                      error={this.state.price === '' || (!/^([0-9])*$/.test(this.state.price))}
                    />
    
                    <Form.Group widths='equal'>
                      <Form.Field label='Publication Date' />
                      <Form.Field label='Finish Date'  />
                    </Form.Group>
    
                    <Form.Group widths='equal'>
                    <div style={dateStyle}>
                      <DatePicker
                        label='First name'
                        selected={this.state.startDate < moment().add(1, 'days').add(5, 'minutes') ? moment().add(1, 'days').add(5, 'minutes') : moment(this.state.startDate)}
                        onChange={this.handleChangeStartDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        minTime={moment().locale(this.props.getLanguage()).format('ll') === moment(this.state.startDate1).locale(this.props.getLanguage()).format('ll') ? moment() : moment('2016-03-12 00:00:01')}
                        maxTime={moment('2016-03-12 23:59:00')}
                        minDate={moment().add(1, 'days')}
                        locale={this.props.getLanguage()}
                      />
                    </div>
                      <div style={dateStyle}>
                        <DatePicker
                          selected={this.state.endDate < moment().add(2, 'days').add(5, 'minutes') ? moment().add(2, 'days').add(5, 'minutes') : this.state.endDate}
                          onChange={this.handleChangeEndDate}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="LLL"
                          timeCaption="time"
                          locale={this.props.getLanguage()}
                          // minTime={moment({ hour: this.state.startDate2.hour(), minute: this.state.startDate2.minute() + 5})}
                          minTime={moment().locale(this.props.getLanguage()).format('ll') === moment(this.state.startDate2).locale(this.props.getLanguage()).format('ll') ? moment() : moment('2016-03-12 00:00:01')}
                          maxTime={moment('2016-03-12 23:59:00')}
                          minDate={moment().add(2, 'days')}
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
                      defaultValue={this.state.address}
                      error={this.state.address === ''}
                    />
    
                    <Form.Input
                      fluid
                      name="photo"
                      onChange={this.handleChange}
                      icon='photo'
                      iconPosition='left'
                      placeholder='Add Photo Link'
                      defaultValue={this.state.photo}
                      error={this.state.photo === ''}
                    />
    
                    <Button color='blue' onClick={this.create} fluid size='large' >
                      {this.state.confirm}
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
