import React, { Component } from 'react'
import { Dropdown, Menu, Input, Image, Button } from 'semantic-ui-react'

export default class Header extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      search: ''
    }
  }

  goTo = route => {
    window.location.pathname = `${route}`
  }

  login = () => {
    this.props.auth.login()
  }

  logout = () => {
    this.props.auth.logout()
  }

  handleChange = event => {
    this.setState({ search: event.target.value })
    localStorage.setItem('search', event.target.value)
  }

  handleKeyPress = key => {
    if (key === 'Enter') {
      localStorage.setItem('search', this.state.search)
      window.location.pathname = '/auctions/search'
    }
  }

  onActionSearchAuction = () => {
    localStorage.setItem('search', this.state.search)
    window.location.pathname = '/auctions/search'
  }

  changeLanguageEn = () => {
    this.props.changeLanguage('en')
  }

  changeLanguageEs = () => {
    this.props.changeLanguage('es')
  }

  nickname = () => {
    const profile = JSON.parse(localStorage.getItem('email'))
    const defaultNick = 'user'
    const nick = profile ? profile.nickname || defaultNick : defaultNick
    return nick
  }

  render() {

    return (
      <Menu size='large'>
        <Menu.Item>
            <Image avatar 
            src='https://orig00.deviantart.net/9428/f/2015/206/a/5/esfera_del_dragon_de_1_estrella_render_hd_png_by_todoanimeoficial-d92t5g9.png'
            alt="logo"/>
        </Menu.Item>
        <Menu.Item  as ={Button} 
                    onClick ={() => this.goTo('/home')}
                    name    ={this.props.getTranslation('home')}/>
        <Menu.Item  as      ={Button}  
                    onClick ={() => this.goTo('/auction')}
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

          <Dropdown item text={this.nickname()}>
            <Dropdown.Menu >
            <Dropdown.Item  as={Button}
                            onClick={() => this.goTo('/')}>{this.props.getTranslation('auctions')}</Dropdown.Item>
              {/* disabled={true} */}
              <Dropdown.Item as={Button}
              onClick={this.logout.bind(this)}>{this.props.getTranslation('logout')}</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
          
        </Menu.Menu>
      </Menu>
    )
  }

}
