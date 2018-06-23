import React, { Component } from 'react'
import TransferFormContainer from '../../ui/transferform/TransferFormContainer'

class Transfer extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Transfer</h1>
            <p>Make transfers here.</p>
            <TransferFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Transfer
