import React, { Component } from 'react'
import AuctionService from '../services/AuctionService'
import AuctionsList from '../components/AuctionsList'
import Login from './Login'
import HeaderM from '../components/Header'

const styles = {
  textAlign: 'center'
}

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.auctionService = new AuctionService()
  }
  
  auctionsToFinish = (page, limit) => this.auctionService.getAuctionsToFinish(page, limit)

  recentAuctions = (page, limit) => this.auctionService.getRecentAuctions(page, limit)

  popularAuctions = (page, limit) => this.auctionService.getPopularAuctions(page, limit)
  
  render() {

    const { isAuthenticated } = this.props.auth;
    const { getTranslation: t } = this.props;

    return (
      <div>
      {
        !isAuthenticated() && (
          <Login auth={this.props.auth} getTranslation={this.props.getTranslation}/>
        )
      }
      {
        isAuthenticated() && (
          <div style={styles}>

            <HeaderM  auth={this.props.auth}
                      getTranslation={this.props.getTranslation} 
                      changeLanguage={this.props.changeLanguage}
                      getLanguage={this.props.getLanguage}/> 
            
            <h2>{t('popular')}</h2>
            <AuctionsList getAuctions={this.popularAuctions} getTranslation={this.props.getTranslation}/> 
            <h2>{t('finish')}</h2>
            <AuctionsList getAuctions={this.auctionsToFinish} getTranslation={this.props.getTranslation}/> 
            <h2>{t('published')}</h2>
            <AuctionsList getAuctions={this.recentAuctions} getTranslation={this.props.getTranslation}/> 
  
          </div>
        )
      }
      </div>
    )
  }

}
