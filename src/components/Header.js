import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Menu } from 'semantic-ui-react'

export default class Header extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      loggedIn: false,
      sesionName: 'signIn',
      search: '',
      language: '',
      sesion: this.verifySesion()
    }
  }

  componentDidMount = () => {
    var language = this.props.getLanguage()
    if(language === 'en') {
      language = 'spanish'
    } else {
      language = 'inglés'
    }
    this.setState({ language })
  }

  verifySesion = () => 'signIn'

  handleChange = (event) => {
    this.setState({search: event.target.value})
  }

  changePropLanguage = (idiom, oldIdiom) => {
    this.props.changeLanguage(idiom)
    const language = oldIdiom
    this.setState({ language })
  }

  changeLanguage = () => {
    if(this.props.getLanguage() === 'en') {
      this.changePropLanguage('es', 'inglés')
    } else {
      this.changePropLanguage('en', 'spanish')
    }
  }
  
  render() {

    return (
      
        <Menu inverted attached='top' style={{borderBottom:'solid 1px #2d2e2f'}}>
          
          <Menu.Item  as      ={Link} 
                      to      ='/'
                      name    ='Home'/>
          <Menu.Item  as      ={Link} 
                      to      ='/auctions'
                      name    ={this.props.getTranslation('auction')}/>
          <Menu.Menu  position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search Auctions...' 
              value={this.state.search} onChange={this.handleChange}/>
            </Menu.Item>
            <Menu.Item
              name={this.state.language}
              onClick={this.changeLanguage}
            />
            <Menu.Item
              as={Link}
              name={this.state.sesionName}
              to={this.state.sesion}
            />
          </Menu.Menu>
        </Menu>
    )
  }
}
