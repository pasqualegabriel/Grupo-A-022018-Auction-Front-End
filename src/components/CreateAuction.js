import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import Login from '../containers/Login'
import HeaderM from './Header'
import 'moment/locale/es'
import moment from 'moment'
import 'react-notifications/lib/notifications.css'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-datepicker/dist/react-datepicker.css'

const styles = {
    loginStyle: {
        height: '100%',
        width: '500', 
        padding: '1em'
    }
}

const help = {color:'#990000'}

const dateStyle = {
  width: '300px'
}

export default class CreateAuction extends Component {

  constructor(props) { 
    super(props);
    this.auctionService = new AuctionService()
    this.state = {
      id: JSON.parse(localStorage.getItem('auction-create')).id,
      startDate: JSON.parse(localStorage.getItem('auction-create')).is === 'create' ? moment(JSON.parse(localStorage.getItem('auction-create')).startDate).add(1, 'days') : moment(JSON.parse(localStorage.getItem('auction-create')).startDate).subtract(3, 'hours'),
      endDate: JSON.parse(localStorage.getItem('auction-create')).is === 'create' ? moment(JSON.parse(localStorage.getItem('auction-create')).startDate).add(3, 'days') : moment(JSON.parse(localStorage.getItem('auction-create')).endDate).subtract(3, 'hours'),
      description: JSON.parse(localStorage.getItem('auction-create')).description,
      title: JSON.parse(localStorage.getItem('auction-create')).title,
      price: JSON.parse(localStorage.getItem('auction-create')).price,
      address: JSON.parse(localStorage.getItem('auction-create')).address ? JSON.parse(localStorage.getItem('auction-create')).address : '',
      photo: JSON.parse(localStorage.getItem('auction-create')).photo,
      showTitle: JSON.parse(localStorage.getItem('auction-create')).showTitle,
      confirm: JSON.parse(localStorage.getItem('auction-create')).confirm,
      is: JSON.parse(localStorage.getItem('auction-create')).is
    }
  }

  handleChangeStartDate = (event) => {
    const endDate = moment(event).add(2, 'days') > moment(this.state.endDate) ? moment(event).add(2, 'days') : this.state.endDate
    this.setState({startDate: event, endDate})
  }

  handleChangeEndDate = (event) => {
    this.setState({endDate: event})
  }

  handleChange = (ev, {name, value}) => {
    this.setState({ [name]: value })
  }

  notificationRegisterError = (title, message) => {
    NotificationManager.error(message, title, 3000, () => {
      alert('callback')
    })
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
      photos: this.state.photo,
      bidders: [],
      firstBidders: []
    }
    if (this.state.is === 'create') {
      this.auctionService.auction(newAuction).then(res => {
        const aNotify = {
          is: true,
          title: this.props.getTranslation('successful'),
          message: this.props.getTranslation('message-create'),
          type: 'success'
        }
        newAuction.id = res.data.id
        localStorage.setItem('notify', JSON.stringify(aNotify))
        localStorage.setItem('auction', JSON.stringify(newAuction))
        window.location.pathname = '/detail'
      }).catch(() => {
        this.notificationRegisterError(this.props.getTranslation('alert'), this.props.getTranslation('create-error'))
      }) 
    } 
    if (this.state.is === 'update') { 
      newAuction.id = this.state.id
      this.auctionService.update(newAuction).then(res => {
        const aNotify = {
          is: true,
          title: this.props.getTranslation('successful'),
          message: this.props.getTranslation('message-update'),
          type: 'success'
        }
        localStorage.setItem('notify', JSON.stringify(aNotify))
        localStorage.setItem('auction', JSON.stringify(newAuction))
        window.location.pathname = '/detail'
      }).catch(() => {
        this.notificationRegisterError(this.props.getTranslation('alert'), this.props.getTranslation('fields'))
      })
    }
  }

  errorTitle = () => this.state.title.length < 5 || this.state.title.length > 50

  errorDescription = () => this.state.description.length < 10 || this.state.description.length > 500

  errorPrice = () => this.state.price === '' || (!/^([0-9])*$/.test(this.state.price))

  errorAddress = () => this.state.address === ''

  errorPhoto = () => this.state.photo === ''

  disabledButton = () => this.errorTitle() || this.errorDescription() || this.errorPrice() || this.errorAddress() || this.errorPhoto()

  render() {

    const { isAuthenticated } = this.props.auth;
    const { getTranslation: t } = this.props;

    return ( 
      <div>
        <NotificationContainer/>
      {
        !isAuthenticated() && (
          <Login auth={this.props.auth} getTranslation={this.props.getTranslation} changeLanguage={this.props.changeLanguage}/>
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
                    {t(this.state.showTitle)}
                  </Header>
                    {
                      this.errorTitle() && (
                        <small id="emailHelp" style={help} className="form-text text-muted">{t('error-title')}</small>
                      )
                    }
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
                    {
                      this.errorDescription() && (
                        <small id="emailHelp" style={help} className="form-text text-muted">{t('error-description')}</small>
                      )
                    }
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
                    {
                      this.errorPrice() && (
                        <small id="emailHelp" style={help} className="form-text text-muted">{t('error-price')}</small>
                      )
                    }
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
                      <Form.Field label={t('publication-date')} />
                      <Form.Field label={t('finish-date')}  />
                    </Form.Group>
    
                    <Form.Group widths='equal'>
                    <div style={dateStyle}>
                      <DatePicker
                        label='First name'
                        selected={moment(this.state.startDate) < moment().add(1, 'days') ? moment().add(1, 'days') : moment(this.state.startDate)}
                        onChange={this.handleChangeStartDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="LLL"
                        timeCaption="time"
                        minTime={moment().add(1, 'days').locale(this.props.getLanguage()).format('ll') === moment(this.state.startDate).locale(this.props.getLanguage()).format('ll') ? moment() : moment('2016-03-12 00:00:01')}
                        maxTime={moment('2016-03-12 23:59:00')}
                        minDate={moment().add(1, 'days')}
                        locale={this.props.getLanguage()}
                      />
                    </div>
                      <div style={dateStyle}>
                        <DatePicker
                          selected={moment(this.state.endDate)}
                          // selected={this.state.endDate < moment(this.state.startDate).add(2, 'days') ? moment(this.state.startDate) < moment().add(1, 'days') ? moment(this.state.startDate).add(3, 'days') : moment(this.state.startDate).add(2, 'days') : moment(this.state.endDate)}
                          onChange={this.handleChangeEndDate}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat="LLL"
                          timeCaption="time"
                          locale={this.props.getLanguage()}
                          minTime={moment(this.state.startDate).locale(this.props.getLanguage()).add(2, 'days').format('ll') === moment(this.state.endDate).locale(this.props.getLanguage()).format('ll') ? moment(this.state.startDate) : moment('2016-03-12 00:00:01')}
                          maxTime={moment('2016-03-12 23:59:00')}
                          minDate={moment(this.state.startDate).add(2, 'days')}
                        />
                      </div>
                    </Form.Group>
                    {
                      this.errorAddress() && (
                        <small id="emailHelp" style={help} className="form-text text-muted">{t('error-address')}</small>
                      )
                    }
                    <Form.Input
                      fluid
                      name="address"
                      onChange={this.handleChange}
                      icon='building outline'
                      iconPosition='left'
                      placeholder='Address'
                      defaultValue={this.state.address}
                      helptext='escribi un adireccion'
                      error={this.state.address === ''}
                    />
                    {
                      this.errorPhoto() && (
                        <small id="emailHelp" style={help} className="form-text text-muted">{t('error-photo')}</small>
                      )
                    }
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
    
                    <Button color='blue' onClick={this.create} fluid size='large' disabled={this.disabledButton()} >
                      {t(this.state.confirm)}
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
