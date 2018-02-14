import React, { Component } from 'react';
import { observer } from 'mobx-react'

import './HomePage.css'
import CreateChart from './Chart.js'
import MoveList from '../../components/MoveList/MoveList'
@observer
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {interval: 0};
  }
  componentWillMount() {
    this.props.store.userStore.currContactId = ''
  }
  componentDidMount() {
    CreateChart()
    this.getBtc()
    let interval = setInterval(this.getBtc.bind(this),10000)
    this.setState({interval},()=> console.log(this.state))
  }
  componentWillUnmount(){
    clearInterval(this.state.interval)
  }  
  getBtc(){
    fetch('https://blockchain.info/tobtc?currency=USD&value=1')
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let usd = (100/(res*100))
      console.log(usd);
      this.btc.innerText = '$ '+ (+usd.toFixed(0)).toLocaleString()
      this.usd.innerText = '$ '+ (this.props.store.userStore.user.coins * usd).toLocaleString()
    })
  }
  render() {
    const { user, filteredMoves } = this.props.store.userStore
    return (user &&
      <div className="home-page">
        <div className="userinfo">
          <h2>Hi, Puki</h2>
          <div className="userinfo-content">
          
            <div className="userinfo-balance">
              <span className="muted">CURRENT BALANCE</span>            
              <span> BIT : <span className="amount">Ƀ {user.coins}</span></span>
              <span> USD : <span ref={usd => this.usd = usd}className="amount-converted"></span></span>
            </div>
            <div className="curr-btc">
                <span className="muted">CURRENT BTC USD <span className="live animated flash">live</span></span>
                <span ref={btc => this.btc = btc} className="btc animated pulse">$ 8,456</span>
                
            </div>
          </div>
        </div>
        <div className="chart-container">
          <div id="gobtc-widget-chart" style={{backgroundColor:'rgba(0,0,0,0)'}} data-lang="en"></div>
      </div>
      <MoveList moves={filteredMoves} showContactName={true} max={5}  />
      <div className="article">
        <div className="article-header">
          <h4>Articles</h4>
        </div>
        {/* <img src="http://i.imgur.com/fURk1Ig.jpg" alt="" /> */}
        <img src="http://bitcoinist.com/wp-content/uploads/2017/07/pixellated-bitcoin.jpg" alt="" />
        {/* <img src="https://www.grovnest.com/wp-content/uploads/2017/03/books-wallpaper-books-to-read-28990406-500-375.jpg" alt="" /> */}
        {/* <img src="http://www.jaybartels.com/wp-content/uploads/2017/05/cropped-gladia-3.jpg" alt="" /> */}
        {/* <img src="https://248qms3nhmvl15d4ne1i4pxl-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/Bitcoin-Ethereum-Won-760x400.jpg" alt="" /> */}
        {/* <img src="https://cdn.vox-cdn.com/thumbor/1983UH6kiOVe6enLiXTJUJmLe1A=/6x0:559x311/1600x900/cdn.vox-cdn.com/assets/1779223/bitcoin-565.jpg" alt="" /> */}
        <div className="article-content">
          <p>
            <span>The top 20</span> cryptocurrencies by market capitalization are all down today in excess of 10 percent, market data reveals.
              According to <a href=""><span>CoinMarketCap.com</span></a>, those cryptocurrencies have fallen by at least 13% – and in excess of 25% in the case of XRP – since the start of the day. At one point, within the 24-hour period.
              As of press time, that figure had bounced back somewhat, hovering around $573 billion.
            </p>
          <span className="read">read more</span>
        </div>
      </div>
      <div className="home-page-footer">
        <span>React-MobX-App | create by Sumbat Tadevosian | 01/2018</span>
      </div>
      </div >
    );
  }
}

export default HomePage;
