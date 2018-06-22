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
      purchasedChecked: false,
      publisher: '',
      popularity: '',
      time: '',
      ipfsHash: ''
    }
    //this.getDataSet()
  }

  handleTitleChange() {
    if (this.state.titleChecked === false) {
      this.setState({addressChecked: false})
      this.setState({purchasedChecked: false})
      this.setState({titleChecked: true})
      this.setState({data: []})
      this.getTitles(1)
    }
  }

  handleAddressChange() {
    if (this.state.addressChecked === false) {
      this.setState({titleChecked: false})
      this.setState({purchasedChecked: false})
      this.setState({addressChecked: true})
      this.setState({data: []})
      this.getTitles(2)
    }
  }

  handlePurchasedChange() {
    if (this.state.purchasedChecked === false) {
      this.setState({titleChecked: false})
      this.setState({addressChecked: false})
      this.setState({purchasedChecked: true})
      this.setState({data: []})
      this.getTitles(3)
    }
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
    contractEduInstance.getPublisher(title, {from: coinbase}, function(error, publisher) {
      if (error) {
        return swal('Error.')
      }
      containerInstance.setState({publisher: publisher})
      contractEduInstance.getPopularity(title, {from: coinbase}, function(error, popularity) {
        if (error) {
          return swal('Error.')
        }
        containerInstance.setState({popularity: popularity.toNumber()})
        contractEduInstance.getPublishTime(title, {from: coinbase}, function(error, time) {
          if (error) {
            return swal('Error.')
          }
          containerInstance.setState({time: time.toNumber()})
          contractEduInstance.getIpfsAfterTitle(title, {from: coinbase}, function(error, ipfs) {
            if (error) {
              return swal('Error.')
            }
            containerInstance.setState({ipfsHash: 'https://gateway.ipfs.io/ipfs/' + ipfs})
          })
        })
      })
    })
  }

  handleShowIPFS(title) {
    // Get IPFS hash.
    let contractEduInstance = store.getState().eduContract.eduContract
    let coinbase = store.getState().address.address
    let containerInstance = this
    contractEduInstance.purchaseIpfsAfterTitle(title, {from: coinbase}, function(error, tx) {
      if (error) {
        return swal('Error.')
      }
      contractEduInstance.getIpfsAfterTitle(title, {from: coinbase}, function(error, ipfs) {
        if (error) {
          return swal('Error.')
       }
        containerInstance.setState({ipfsHash: 'https://gateway.ipfs.io/ipfs/' + ipfs})
      })
    })
  }

  handleLike(title) {
    let contractEduInstance = store.getState().eduContract.eduContract
    let coinbase = store.getState().address.address
    let containerInstance = this
    contractEduInstance.votePopularity(title, {from: coinbase}, function(error, tx) {
      if (error) {
        return swal('Error.')
      }
      contractEduInstance.getPopularity(title, {from: coinbase}, function(error, result) {
        if (error) {
          return swal('Error.')
        }
        containerInstance.setState({popularity: result.toNumber()})
      })
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

  getTitles(choice) {
    let contractEduInstance = store.getState().eduContract.eduContract
    this.getTitleSet(contractEduInstance, choice)
  }

  getTitleSet(instance, choice) {
    let containerInstance = this
    let coinbase = store.getState().address.address
    if (choice === 1) {
      return instance.titlesCount(function(error, count) {
        var size = count.toNumber()
        return containerInstance.getTitlesByIndex(0, size, instance, choice)
      })
    } else if (choice === 3) {
      return instance.userPurchasedCount.call(coinbase, function(error, count) {
        var size = count.toNumber()
        return containerInstance.getTitlesByIndex(0, size, instance, choice)
      })
    } else {
      return instance.addressCount.call(coinbase, function(error, count) {
        var size = count.toNumber()
        return containerInstance.getTitlesByIndex(0, size, instance, choice)
      })
    }
  }

  getTitlesByIndex(start, end, instance, choice) {
    let coinbase = store.getState().address.address
    let web3 = store.getState().web3.web3Instance;
    let containerInstance = this
    let titles = []
    return Promise.all(containerInstance.range(start, end, choice).map((index,count) => {
      if (choice === 1) {
        return instance.getTitle(index, {from: coinbase}, function(error, title) {
          titles.push({id: index, name: web3.toUtf8(title)})
          containerInstance.setState({data: titles})
        })
      } else if (choice === 3) {
        return instance.getPurchaseAddress(index, {from: coinbase}, function(error, title) {
          titles.push({id: index, name: web3.toUtf8(title)})
          containerInstance.setState({data: titles})
        })
      } else {
        return instance.getTitleAddress(index, {from: coinbase}, function(error, title) {
          titles.push({id: index, name: web3.toUtf8(title)})
          containerInstance.setState({data: titles})
        })
      }
    }))
  }

  range(start, end, choice) {
    if (typeof end === 'undefined'){
      end = start
      start = 0
    }
    if (choice > 1) {
      start = 1
      end++
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

  return (
    <div ref="ref" className="pure-form pure-form-stacked">
      <h3>Choose an option after which you want to search for articles.</h3>
      <p>Accessing information about article is free. 
      If you want to acces it's content, purchase it once for <strong>6 ESc</strong> tokens and you are good to go. 
      If you like the article, you can increase it's rating by liking it. The higher the popularity, the better the content. 
      It costs <strong>2 ESc</strong> tokens. 
      Also, you can make donations to the publishers address by going to the Transfer section.</p>
      <label>After title: </label>
      <input type="checkbox" checked={ this.state.titleChecked } onChange={ this.handleTitleChange.bind(this) } />
      <br/ >
      <label>Your own: </label>
      <input type="checkbox" checked={ this.state.addressChecked } onChange={ this.handleAddressChange.bind(this) } /> 
      <br/ >
      <label>Purchased: </label>
      <input type="checkbox" checked={ this.state.purchasedChecked } onChange={ this.handlePurchasedChange.bind(this) } /> 
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
  )
}
}

export default SearchForm