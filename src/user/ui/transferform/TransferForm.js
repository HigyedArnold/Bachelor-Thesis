import React, { Component } from 'react'
import swal from 'sweetalert'
import store from '../../../store'

class TransferForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      amount: '0',
      toAddress: '0x0',
      balance: '0'
    }

    this.initDynamicToken()
    this.listenForEvents()
  }

  onAmountInputChange(event) {
    this.setState({ amount: event.target.value })
  }

  onToAddressInputChange(event) {
    this.setState({ toAddress: event.target.value })
  }

  transferTokens(event) {
    event.preventDefault();
    if (this.state.amount === "") {
      return swal('Please enter a number.')
    }
    if (this.state.toAddress === "") {
      return swal('Please enter a valid address.')
    }
    this.props.onTransferFormSubmit(this.state.amount, this.state.toAddress)
  }

  initDynamicToken() {
    let containerInstance = this
    let coinbase = store.getState().address.address
    let contractTokenInstance = store.getState().tokenContract.tokenContract
    contractTokenInstance.balanceOf(coinbase).then(function(balance) {
      if(containerInstance.refs.ref) {
        containerInstance.setState({balance: balance.toNumber()})
      }
    })
  }

  listenForEvents() {
    let containerInstance = this
    let coinbase = store.getState().address.address
    let contractTokenInstance = store.getState().tokenContract.tokenContract
    contractTokenInstance.Transfer({}, {
      fromBlock: "0",
      toBlock: "lastest",
    }).watch(function(error, event) {
      if (event.args._from === coinbase) {
        //console.log("Transfer event triggered: ", event)
        containerInstance.initDynamicToken()
        containerInstance.state.amount = ''
        containerInstance.state.toAddress = ''
        containerInstance.render()
      }
    })
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.transferTokens.bind(this)}>
        <fieldset>
          <div ref="ref">
            <label>Your balance is: <strong>{this.state.balance}</strong> ESc.</label>
            <br />
            <label>Amount to transfer:</label>
            <input id="amount" type="text" pattern="[1-9][0-9]*" value={this.state.amount} onChange={this.onAmountInputChange.bind(this)} />
            <br />
            <label>To address:</label>
            <input id="toAddress" type="text" pattern="0x[0-9A-Za-z]{40}" value={this.state.toAddress} onChange={this.onToAddressInputChange.bind(this)} />
            <br />
            <button type="submit" className="pure-button pure-button-primary">Transfer</button>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default TransferForm