import EduScienceTokenSale from '../../../build/contracts/EduScienceTokenSale.json'
import store from '../../store'
const contract = require('truffle-contract')

export const SALE_CONTRACT = 'SALE_CONTRACT'
function saleContract(contract) {
  return {
    type: SALE_CONTRACT,
    payload: contract
  };
}

let getSaleContract = new Promise(function(resolve, reject) {
  window.addEventListener('load', function(dispatch) {
    let web3 = store.getState().web3.web3Instance;
    var results
    if (typeof web3 !== 'undefined') {
      const eduScienceTokenSale = contract(EduScienceTokenSale)
      eduScienceTokenSale.setProvider(web3.currentProvider)
      eduScienceTokenSale.deployed().then(function(instance) {
        results = {
          saleContract: instance
        }
        console.log('SaleContract stored!');
        resolve(store.dispatch(saleContract(results)))
      })
    }
  })
})

export default getSaleContract
