import React, { Component } from 'react'
import ICOSaleFormContainer from '../../ui/icosaleform/ICOSaleFormContainer'

class ICOSale extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>ICOSale</h1>
            <p>Introducing EduScience Token sale (ESc)!</p>
            <ICOSaleFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default ICOSale
