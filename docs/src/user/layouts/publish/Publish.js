import React, { Component } from 'react'
import PublishFormContainer from '../../ui/publishform/PublishFormContainer'

class Publish extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Publish</h1>
            <p>Publish your article in pdf format here.</p>
            <PublishFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Publish
