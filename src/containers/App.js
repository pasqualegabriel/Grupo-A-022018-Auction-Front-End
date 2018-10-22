import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import { withNamespaces } from 'react-i18next';
import Header from '../components/Header';
import AuctionDetails from '../components/AuctionDetails';
import 'react-notifications/lib/notifications.css'
import Login from './Login'
import Home from './Home'

class App extends Component {

  getTranslation = (key) => this.props.t(key)

  changeLanguage = (lng) => {
    this.props.i18n.changeLanguage(lng)
  }

  getLanguage = () => this.props.lng

  render() {

    return (
      <div>
        <Header getTranslation={this.getTranslation} 
                changeLanguage={this.changeLanguage}
                getLanguage={this.getLanguage}/>
        <Switch>
          <Route exact path="/" render={()=><Home/>}/>
          <Route exact path="/signIn" render={()=><Login getTranslation={this.getTranslation} />}/>
          <Route exact path="/auction" render={()=><AuctionDetails getTranslation={this.getTranslation} />}/>
        </Switch>
      </div>
    );
  }

}

export default withNamespaces('translation')(App);

/*
import React, { Component } from 'react';
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';
import logo from './logo.svg';
import './App.css';

// Component using the render prop NamespacesConsumer
// get t function inside the component
// learn more: https://react.i18next.com/components/namespacesconsumer
function Welcome() {
  return (
    <NamespacesConsumer>
      {
        (t, { i18n }) => <h2>{t('title')}</h2>
      }
    </NamespacesConsumer>
  )
}

// Component using the higher order component withNamespaces
// pass t function via props into the component
// learn more: https://react.i18next.com/components/withnamespaces
function MyComponent({t}) {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  )
}
const MyComponentWrapped = withNamespaces()(MyComponent);


// the app gets passed in t and i18n by using same hoc withNamespaces
// using i18n.changeLanguage you can change the language programmatically
// (same is possible using the NamespacesConsumer render prop - just read the docs)
class App extends Component {
  render() {
    const { t, i18n } = this.props;

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome />
          <button onClick={() => changeLanguage('de')}>de</button>
          <button onClick={() => changeLanguage('en')}>en</button>
        </div>
        <div className="App-intro">
          <MyComponentWrapped />
        </div>
        <div>{t('description.part2')}</div>
      </div>
    );
  }
}
export default withNamespaces('translation')(App);


*/