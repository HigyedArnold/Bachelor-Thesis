import EduScienceToken from '../../../build/contracts/EduScienceToken.json'
import store from '../../store'
const contract = require('truffle-contract')

export const TOKEN_CONTRACT = 'TOKEN_CONTRACT'
function tokenContract(contract) {
  return {
    type: TOKEN_CONTRACT,
    payload: contract
  };
}

let getTokenContract = new Promise(function(resolve, reject) {
  window.addEventListener('load', function(dispatch) {
    let web3 = store.getState().web3.web3Instance;
    var results
    if (typeof web3 !== 'undefined') {
      const eduScienceToken = contract(EduScienceToken)
      eduScienceToken.setProvider(web3.currentProvider)
      eduScienceToken.deployed().then(function(instance) {
        results = {
          tokenContract: instance
        }
        console.log('TokenContract stored!');
        resolve(store.dispatch(tokenContract(results)))
      })
    }
  })
})

export default getTokenContract
