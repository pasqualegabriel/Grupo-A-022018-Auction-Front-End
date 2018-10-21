import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Menu } from 'semantic-ui-react'

export default class Header extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      search: ''
    }
  }

  handleChange = (event) => {
    this.setState({search: event.target.value})
  }

  changeLanguage = () => {
    if(this.props.getLanguage() === 'en') {
      this.props.changeLanguage('es')
    } else {
      this.props.changeLanguage('en')
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
              name={this.props.getTranslation('idiom')}
              onClick={this.changeLanguage}
            />
            <Menu.Item
              as={Link}
              name='signIn'
              to='/signIn'
            />
          </Menu.Menu>
        </Menu>
    )
  }
}
