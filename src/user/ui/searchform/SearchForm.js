import React, { Component } from 'react'
import store from '../../../store'
import swal from 'sweetalert'
import FilteredMultiSelect from 'react-filtered-multiselect'

class SearchForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      selectedData: [],
      titleChecked: false,
      addressChecked: false,
      publisher: '',
      popularity: '',
      time: '',
      ipfsHash: ''
    }
    this.getTitles()
    //this.getDataSet()
  }

  handleTitleChange() {
    if (this.state.titleChecked === false) {
      this.setState({addressChecked: false})
    }
    this.setState({titleChecked: !this.state.titleChecked})
  }

  handleAddressChange() {
    if (this.state.addressChecked === false) {
      this.setState({titleChecked: false})
    }
    this.setState({addressChecked: !this.state.addressChecked})    
  }

  onSubmit(event) {   
  }

  handleDeselect(index) {
    var selectedData = this.state.selectedData.slice()
    selectedData.splice(index, 1)
    this.setState({selectedData})
    this.setState({ipfsHash: ''})
    this.setState({publisher: ''})
    this.setState({popularity: ''})
    this.setState({time: ''})
  }

  handleShowInfo(title) {
    // Get publisher, popularity and time.
    let contractEduInstance = store.getState().eduContract.eduContract
    let coinbase = store.getState().address.address
    let containerInstance = this
    contractEduInstance.getPublisher(title, {from: coinbase}).then(function(publisher) {
      containerInstance.setState({publisher: publisher})
      contractEduInstance.getPopularity(title, {from: coinbase}).then(function(popularity) {
        containerInstance.setState({popularity: popularity.toNumber()})
        contractEduInstance.getPublishTime(title, {from: coinbase}).then(function(time) {
          containerInstance.setState({time: time.toNumber()})
          contractEduInstance.getIpfsAfterTitle(title, {from: coinbase}).then(function(ipfs) {
            containerInstance.setState({ipfsHash: 'https://gateway.ipfs.io/ipfs/' + ipfs})
          })
        })
      })
    }).catch(function(error) {
      return swal('Could not proceed.','Transaction failed!','warning')
    })
  }

  handleShowIPFS(title) {
    // Get IPFS hash.
    let contractEduInstance = store.getState().eduContract.eduContract
    let coinbase = store.getState().address.address
    let containerInstance = this
    contractEduInstance.purchaseIpfsAfterTitle(title, {from: coinbase}).then(function(tx) {
      contractEduInstance.getIpfsAfterTitle(title, {from: coinbase}).then(function(ipfs) {
        containerInstance.setState({ipfsHash: 'https://gateway.ipfs.io/ipfs/' + ipfs})
      })
    }).catch(function(error) {
      return swal('Could not proceed.','Transaction failed!','warning')
    })
  }

  handleLike(title) {
    let contractEduInstance = store.getState().eduContract.eduContract
    let coinbase = store.getState().address.address
    let containerInstance = this
    contractEduInstance.votePopularity(title, {from: coinbase}).then(function(tx) {
      contractEduInstance.getPopularity(title, {from: coinbase}).then(function(result) {
        containerInstance.setState({popularity: result.toNumber()})
      })
    }).catch(function(error) {
      // ERROR
    })
  }

  handleSelectionChange = (selectedData) => {
    this.setState({selectedData})
  }

  // ------------- For data query ------------- //

  // titleData is private !!!
  // getDataSet() {
  //   let contractEduInstance = store.getState().eduContract.eduContract
  //   let containerInstance = this
  //   this.getTitleSet(contractEduInstance).then(mapIterator => containerInstance.getDataStructs(mapIterator)).then(result => {
  //     console.log('Data: ',result)
  //     //console.log(JSON.stringify(result, null, 5))
  //   })
  // }

  // getDataStructs(mapIterator) {
  //   let web3 = store.getState().web3.web3Instance;
  //   let coinbase = store.getState().address.address
  //   const { instance, size, keys } = mapIterator;
  //   return Promise.all(keys.map(title => 
  //       {return instance.titleData(title).then(_data => ({ title, _data }))
  //     })
  //   ).then(list => list.reduce((memo,entry) => ({
  //     [entry.title]: {
  //       ipfsHash: entry._data[0],
  //       publisher: entry._data[1],
  //       title: web3.toUtf8(entry._data[2]),
  //       popularity: entry._data[3].toNumber(),
  //       time: entry._data[4].toNumber()
  //     },
  //   ...memo
  //   }),{}))
  // }

  getTitles() {
    let web3 = store.getState().web3.web3Instance;
    let contractEduInstance = store.getState().eduContract.eduContract
    let titles = []
    let containerInstance = this
    this.getTitleSet(contractEduInstance).then(result => {
      for (var i = 0; i < result.size; i++) {
        titles.push({id: i, name: web3.toUtf8(result.keys[i])})
        //console.log('Title: ', web3.toUtf8(result.keys[i]))
      }
      //console.log(titles)
      containerInstance.setState({data: titles})
      //console.log('Data titles: ', result)
    }).catch(error => {
      // ERROR
    })
  }

  getTitleSet(instance) {
    let containerInstance = this
    return this.Iterator(instance).then(iterator => {
      const { size } = iterator
      return containerInstance.getTitlesByIndex(0, size, instance)
    })
  }

  getTitlesByIndex(start, end, instance) {
    let coinbase = store.getState().address.address
    const size = end - start
    let containerInstance = this
    return Promise.all(containerInstance.range(start, end).map((index,count) => instance.getTitle(index, {from: coinbase})))
    .then(keys => ({size, keys, instance}))
  }

  Iterator(instance) {
    return instance.titlesCount().then(count => count.toNumber()).then(size => ({ instance, size }))
  }

  range(start, end) {
    if (typeof end === 'undefined'){
      end = start
      start = 0
    }
    var result = []
    for (var i = start; i < end; i++){ 
      result.push(i)
    }
    return result
  }

  // ------------- For data query ------------- //

 render() {
  let selectedData = this.state.selectedData

  const titleContent = this.state.titleChecked
  ? <div ref="ref" className="pure-form pure-form-stacked">
        <FilteredMultiSelect onChange={this.handleSelectionChange} options={this.state.data} selectedOptions={selectedData} textProp="name" valueProp="id"/>
        {selectedData.length === 0}
        {selectedData.length > 0 && <ul>
        {selectedData.map((selection, i) => <li key={selection.id}> {`${selection.name}`}
                                            <button type="submit" className="pure-button pure-button-primary" 
                                            onClick={() => this.handleDeselect(i)}>
                                            Remove</button>
                                            <button type="submit" className="pure-button pure-button-primary" 
                                            onClick={() => this.handleShowInfo(selection.name)}>
                                            Show info</button>
                                            <button type="submit" className="pure-button pure-button-primary" 
                                            onClick={() => this.handleShowIPFS(selection.name)}>
                                            Purchase</button>
                                            <button type="submit" className="pure-button pure-button-primary" 
                                            onClick={() => this.handleLike(selection.name)}>
                                            Like</button>
                                            </li>)}
        </ul>}
        <br />
        <label>IPFS address: {this.state.ipfsHash}</label>
        <label>Publisher: {this.state.publisher}</label>
        <label>Popularity: {this.state.popularity}</label>
        <label>Publish time: {this.state.time}</label>
    </div>
  : null;

  const addressContent = this.state.addressChecked
  ? <div> TODO </div>
  : null

  return (
    <div ref="ref">
      <form className="pure-form pure-form-stacked">
        <h3>Choose an option after which you want to search articles.</h3>
        <label>After title: </label>
        <input type="checkbox" checked={ this.state.titleChecked } onChange={ this.handleTitleChange.bind(this) } />
        <br/ >
        <label>After publisher: </label>
        <input type="checkbox" checked={ this.state.addressChecked } onChange={ this.handleAddressChange.bind(this) } /> 
      </form>
      { titleContent }
      { addressContent }
    </div>
  )
}
}

export default SearchForm