import React, { Component } from 'react'
import Auth from './Auth'

const auth = new Auth()

export default class Login extends Component {

  login = () => auth.login()

  render() {

    return (

        <button onClick={this.login}>login</button> 

    )
  }

}
