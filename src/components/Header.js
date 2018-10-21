import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Input } from 'semantic-ui-react'

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

  handleKeyPress = ({key}) => {
    if (key === 'Enter') {
      window.location.pathname = '/auctions'
    }
  }

  changeLanguageEn = () => this.props.changeLanguage('en')

  changeLanguageEs = () => this.props.changeLanguage('es')

  render() {

    return (
      <Menu size='large'>
        <Menu.Item  as      ={Link} 
                    to      ='/'
                    name    ={this.props.getTranslation('home')}/>
        <Menu.Item  as      ={Link} 
                    to      ='/auctions'
                    name    ={this.props.getTranslation('auction')}/>

        <Menu.Menu position='right'>

          <Menu.Item>
            <Input icon='search' placeholder={this.props.getTranslation('search-placeholder')} 
            onKeyPress={this.handleKeyPress}
            value={this.state.search} onChange={this.handleChange}/>
          </Menu.Item>
          <Dropdown item text={this.props.getTranslation('language-tilte')}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.changeLanguageEn}>{this.props.getTranslation('idiom-en')}</Dropdown.Item>
              <Dropdown.Item onClick={this.changeLanguageEs}>{this.props.getTranslation('idiom-es')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
