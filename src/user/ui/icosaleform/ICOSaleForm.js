import React, { Component } from 'react'
import swal from 'sweetalert'
import { Line } from 'rc-progress';
import store from '../../../store'

class ICOSaleForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      amount: '',
      address: '0x0',
      icoPrice: '0',
      balance: '0',
      contractAddress: '0x0',
      tokensSold: '0',
      tokensAvailable: '0'
    };
    this.initStaticSale()
    this.initDynamicSale()
    this.initDynamicToken()
    this.listenForEvents()
  }

  onInputChange(event) {
    this.setState({ amount: event.target.value })
  }

  buyTokens(event) {
    event.preventDefault();
    if (this.state.amount === "") {
      return swal('Please enter a number.')
    }
    this.props.onICOSaleFormSubmit(this.state.amount)
  }

  initStaticSale() {
    let containerInstance = this
    let web3 = store.getState().web3.web3Instance;
    let contractSaleInstance = store.getState().saleContract.saleContract
    let coinbase = store.getState().address.address
    contractSaleInstance.tokenPrice().then(function(icoPrice) {
      containerInstance.setState({address: coinbase})
      containerInstance.setState({icoPrice: web3.fromWei(icoPrice, "ether").toNumber() })
      containerInstance.setState({contractAddress: contractSaleInstance.address})
    })
  }

  initDynamicSale() {
    let containerInstance = this
    let contractSaleInstance = store.getState().saleContract.saleContract
    contractSaleInstance.tokensSold().then(function(tokensSold) {
      if(containerInstance.refs.myRef) {
        containerInstance.setState({tokensSold: tokensSold.toNumber()})
      }
      contractSaleInstance.tokensAvailable().then(function(tokensAvailable) {
        if(containerInstance.refs.myRef) {
          containerInstance.setState({tokensAvailable: tokensAvailable.toNumber()})
        }
      })
    })
  }

  initDynamicToken() {
    let containerInstance = this
    let contractTokenInstance = store.getState().tokenContract.tokenContract
    contractTokenInstance.balanceOf(this.state.address).then(function(balance) {
      if(containerInstance.refs.myRef) {
        containerInstance.setState({balance: balance.toNumber()})
      }
    })
  }

  listenForEvents() {
    let containerInstance = this
    let contractSaleInstance = store.getState().saleContract.saleContract
    contractSaleInstance.Sell({}, {
      fromBlock: "0",
      toBlock: "lastest",

    }).watch(function(error, event) {
      //console.log("Event triggered: ", event)
      containerInstance.initDynamicSale()
      containerInstance.initDynamicToken()
      containerInstance.state.amount = ''
      containerInstance.render()
    })
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.buyTokens.bind(this)}>
        <fieldset>
        <div ref="myRef">
          <label>Price is <strong>{this.state.icoPrice}</strong> Ether. Your balance is: <strong>{this.state.balance}</strong> ESc.</label>
          <br />
          <label>Your account address: <strong>{this.state.address}</strong></label>
          <label>The sale contract address: <strong>{this.state.contractAddress}</strong></label>
          <br />
          <label htmlFor="name">Amount to buy:</label>
          <input id="amount" type="text" pattern="[1-9][0-9]*" value={this.state.amount} onChange={this.onInputChange.bind(this)} />
          <br />
          <button type="submit" className="pure-button pure-button-primary">Buy Tokens</button>
          <br />
          <br />
          <label>{((this.state.tokensSold / this.state.tokensAvailable) * 100).toFixed(2)}% of tokens sold!</label>
          <Line percent={(this.state.tokensSold / this.state.tokensAvailable) * 100} strokeWidth="1" strokeColor="#0066ff" />
        </div>
        </fieldset>
      </form>
    )
  }
}

export default ICOSaleForm