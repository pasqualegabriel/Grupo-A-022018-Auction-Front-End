import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './containers/App';
import Home from './containers/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import CreateAuction from './components/CreateAuction'
import AuctionsSearch from './components/AuctionsSearch'
import AuctionDetails from './components/AuctionDetails'

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route exact path="/home"     render={()=><Home/>}/>
          <Route exact path="/auction"  render={()=><CreateAuction />}/>
          <Route exact path="/auctions/search" render={()=><AuctionsSearch  />}/>
          <Route exact path="/detail"   render={()=><AuctionDetails />}/>
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
