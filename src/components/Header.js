import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {setItem} from '../services/LocalStorageService'
import { Dropdown, Menu, Input, Image } from 'semantic-ui-react'

export default class Header extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      search: ''
    }
  }

  handleChange = (event) => {
    this.setState({search: event.target.value})
    setItem('title', { title: event.target.value})
  }

  handleKeyPress = ({key}) => {
    if (key === 'Enter') {
      setItem('title', { title: this.state.search})
      window.location.pathname = '/auctions/search'
    }
  }

  onActionSearchAuction = () => { 
    setItem('title', { title: this.state.search})
    window.location.pathname = '/auctions/search'
  }

  changeLanguageEn = () => this.props.changeLanguage('en')

  changeLanguageEs = () => this.props.changeLanguage('es')

  render() {

    return (
      <Menu size='large'>
         <Menu.Item onClick={this.props.click1}>
            <Image avatar 
            src='https://orig00.deviantart.net/9428/f/2015/206/a/5/esfera_del_dragon_de_1_estrella_render_hd_png_by_todoanimeoficial-d92t5g9.png'
            alt="logo"/>
        </Menu.Item>
        <Menu.Item  as ={Link} 
                    to      ='/home'
                    name    ={this.props.getTranslation('home')}/>
        <Menu.Item  as      ={Link}  
                    to      ='/auction'
                    name    ={this.props.getTranslation('auction')}/>

        <Menu.Menu position='right'>
        
          <Menu.Item>
            <Input action={{ type: 'submit', content: 'Go', onClick: this.onActionSearchAuction }}
            placeholder={this.props.getTranslation('search-placeholder')} 
            onKeyPress={this.handleKeyPress} 
            value={this.state.search} onChange={this.handleChange}/>
          </Menu.Item>
          <Dropdown item text={this.props.getTranslation('language-tilte')}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.changeLanguageEn}>{this.props.getTranslation('idiom-en')}</Dropdown.Item>
              {/* disabled={true} */}
              <Dropdown.Item onClick={this.changeLanguageEs}>{this.props.getTranslation('idiom-es')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='invited' >
            <Dropdown.Menu >
            <Dropdown.Item as={Link}
                             to='/signIn'>Auctions</Dropdown.Item>
              <Dropdown.Item as={Link}
                             to='/signIn'>Profile</Dropdown.Item>
              {/* disabled={true} */}
              <Dropdown.Item as={Link}
                             to='/signIn'>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
        </Menu.Menu>
      </Menu>
    )
  }

}
