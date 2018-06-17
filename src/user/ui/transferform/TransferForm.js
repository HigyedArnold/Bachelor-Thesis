import React, { Component } from 'react'
import swal from 'sweetalert'
import store from '../../../store'

class TransferForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      amount: '',
      toAddress: '',
      apamount: '',
      apAddress: '',
      framount: '',
      frAddress: '',
      frToAddress: '',
      balance: ''
    }

    this.initToken()
    this.listenForEvents()
  }

  onAmountInputChange(event) {
    this.setState({ amount: event.target.value })
  }

  onToAddressInputChange(event) {
    this.setState({ toAddress: event.target.value })
  }

  onApAmountInputChange(event) {
    this.setState({ apamount: event.target.value })
  }

  onApAddressInputChange(event) {
    this.setState({ apAddress: event.target.value })
  }

  onFrAmountInputChange(event) {
    this.setState({ framount: event.target.value })
  }

  onFrAddressInputChange(event) {
    this.setState({ frAddress: event.target.value })
  }

  onFrToAddressInputChange(event) {
    this.setState({ frToAddress: event.target.value })
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

  approveTokens(event) {
    event.preventDefault();
    if (this.state.apamount === "") {
      return swal('Please enter a number.')
    }
    if (this.state.apAddress === "") {
      return swal('Please enter a valid address.')
    }
    this.props.onApproveFormSubmit(this.state.apamount, this.state.apAddress)
  }

  transferFromTokens(event) {
    event.preventDefault();
    if (this.state.framount === "") {
      return swal('Please enter a number.')
    }
    if (this.state.frAddress === "") {
      return swal('Please enter a valid address.')
    }
    if (this.state.frToAddress === "") {
      return swal('Please enter a valid address.')
    }
    this.props.onTransferFromFormSubmit(this.state.framount, this.state.frAddress, this.state.frToAddress)
  }

  initToken() {
    let containerInstance = this
    let coinbase = store.getState().address.address
    let contractTokenInstance = store.getState().tokenContract.tokenContract
    contractTokenInstance.balanceOf(coinbase).then(function(balance) {
      if(containerInstance.refs.ref) {
        containerInstance.setState({balance: balance.toNumber()})
      }
    }).catch(function(error) {
      // ERROR
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
        containerInstance.initToken()
        containerInstance.setState({amount: ''})
        containerInstance.setState({toAddress: ''})
        containerInstance.setState({apamount: ''})
        containerInstance.setState({apAddress: ''})
        containerInstance.setState({framount: ''})
        containerInstance.setState({frAddress: ''})
        containerInstance.setState({frToAddress: ''})
      }
    })
  }

  render() {
    return(
      <div ref="ref">
        <form className="pure-form pure-form-stacked" onSubmit={this.transferTokens.bind(this)}>
          <fieldset>
            <label>Your balance is: <strong>{this.state.balance}</strong> ESc.</label>
            <label>Transfer X amount of ESc tokens to 0xX account from your account.</label>
            <label>Amount to transfer:</label>
            <input id="amount" type="text" pattern="[1-9][0-9]{0,77}" value={this.state.amount} onChange={this.onAmountInputChange.bind(this)} />
            <br />
            <label>To address:</label>
            <input id="toAddress" type="text" pattern="0x[0-9A-Za-z]{40}" value={this.state.toAddress} onChange={this.onToAddressInputChange.bind(this)} />
            <br />
            <button type="submit" className="pure-button pure-button-primary">Transfer</button>
          </fieldset>
        </form>
        <br />
        <br />
        <form className="pure-form pure-form-stacked" onSubmit={this.approveTokens.bind(this)}>
          <fieldset>
            <label>Approve X amount of ESc tokens for 0xX account to spend from your account.</label>
            <label>Amount to approve:</label>
            <input id="apamount" type="text" pattern="[1-9][0-9]{0,77}" value={this.state.apamount} onChange={this.onApAmountInputChange.bind(this)} />
            <br />
            <label>For address:</label>
            <input id="apAddress" type="text" pattern="0x[0-9A-Za-z]{40}" value={this.state.apAddress} onChange={this.onApAddressInputChange.bind(this)} />
            <br />
            <button type="submit" className="pure-button pure-button-primary">Approve</button>
          </fieldset>
        </form>
        <br />
        <br />
        <form className="pure-form pure-form-stacked" onSubmit={this.transferFromTokens.bind(this)}>
          <fieldset>
            <label>Transfer X amount of ESc tokens to 0xX account from 0xY account.</label>
            <label>Amount to transfer:</label>
            <input id="framount" type="text" pattern="[1-9][0-9]{0,77}" value={this.state.framount} onChange={this.onFrAmountInputChange.bind(this)} />
            <br />
            <label>From address:</label>
            <input id="frAddress" type="text" pattern="0x[0-9A-Za-z]{40}" value={this.state.frAddress} onChange={this.onFrAddressInputChange.bind(this)} />
            <br />
            <label>To address:</label>
            <input id="frToAddress" type="text" pattern="0x[0-9A-Za-z]{40}" value={this.state.frToAddress} onChange={this.onFrToAddressInputChange.bind(this)} />
            <br />
            <button type="submit" className="pure-button pure-button-primary">Transfer</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default TransferForm