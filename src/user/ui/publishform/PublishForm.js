import React, { Component } from 'react'
import swal from 'sweetalert'
import store from '../../../store'

class PublishForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      url: 'https://gateway.ipfs.io/ipfs/',
      buffer:''
    }
    this.listenForEvents()

  }

  uploadFile(event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)   
  }

   convertToBuffer = async(reader) => {
    // The pdf will be converted to a buffer to be stored on the IPFS
    const result = await Buffer.from(reader.result);
    this.setState({buffer: result})
  }

  onSubmit(event) {
    event.preventDefault()
    if (this.state.buffer === "") {
      return swal('Please select a file.')
    }
    this.props.onStoreData(this.state.buffer)
  }

  updateHash() {
    let containerInstance = this
    let coinbase = store.getState().address.address
    let contractEduInstance = store.getState().eduContract.eduContract
    contractEduInstance.getData({from: coinbase}).then(function(ipfsHash) {
      containerInstance.setState({ipfsHash: ipfsHash})
      containerInstance.setState({url: 'https://gateway.ipfs.io/ipfs/' + ipfsHash})
    })
  }

  listenForEvents() {
    let containerInstance = this
    let coinbase = store.getState().address.address
    let contractEduInstance = store.getState().eduContract.eduContract
    contractEduInstance.Store({}, {
      fromBlock: "0",
      toBlock: "lastest",
    }).watch(function(error, event) {
      if (event.args.publisher === coinbase) {
        //console.log("Store event triggered: ", event)
        containerInstance.updateHash()
        containerInstance.state.buffer = ''
        containerInstance.render()
      }
    })
  }

  render() {
    return (
      <div ref="ref">
        <h3>Choose your pdf file.</h3>
        <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit.bind(this)}>
          <input id="file" type="file" accept="application/pdf" onChange={this.uploadFile.bind(this)} />
          <br />
          <button type="submit" className="pure-button pure-button-primary">Upload</button>
          <br />
          <br />
          <label>IPFS hash address: <strong>{this.state.ipfsHash}</strong></label>
          <label>Go to: <strong><a href={this.state.url}>link</a></strong></label>
        </form>
     </div>
    );
  }

}

export default PublishForm