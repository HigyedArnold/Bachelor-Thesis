import EduScienceTokenSale from '../../../../build/contracts/EduScienceTokenSale.json'
import store from '../../../store'
import swal from 'sweetalert'

const contract = require('truffle-contract')

export const BUY_ICO = 'BUY_ICO'
function ICOBought(amount) {
  return {
    type: BUY_ICO,
    payload: amount
  };
}

export function buyICO(amount) {
  let web3 = store.getState().web3.web3Instance;
  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      const eduScienceTokenSale = contract(EduScienceTokenSale)
      eduScienceTokenSale.setProvider(web3.currentProvider)
      let contractSaleInstance
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
        console.error(error)
        }
        eduScienceTokenSale.deployed().then(function(instance) {
          contractSaleInstance = instance
          contractSaleInstance.tokenPrice().then(function(tokenPrice) {
            contractSaleInstance.buyTokens(amount, {from: coinbase, value: amount * tokenPrice, gas: 500000}).then(function(result, dispatch) {
              console.log("Tokens bought: ", amount)
              swal('ICO purchased!', 'Transaction successful!','success')
              return dispatch(ICOBought({"amount": amount}))
            })
            .catch(function(result) {
            })
          })
        })
      })
    }
  }
}