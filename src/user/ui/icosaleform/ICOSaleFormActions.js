import store from '../../../store'
import swal from 'sweetalert'

export const BUY_ICO = 'BUY_ICO'
function ICOBought(amount) {
  return {
    type: BUY_ICO,
    payload: amount
  };
}

export function buyICO(amount) {
  let contractSaleInstance = store.getState().saleContract.saleContract
  let coinbase = store.getState().address.address
  return function(dispatch) {
    contractSaleInstance.tokenPrice().then(function(tokenPrice) {
      let price = tokenPrice.toNumber()
      contractSaleInstance.buyTokens(amount, {from: coinbase, value: amount * price, gas: 500000}).then(function(result) {
        console.log("Tokens bought: ", amount)
        swal('ICO purchased!', 'Transaction successful!','success')
        dispatch(ICOBought({"amount": amount}))
      }).catch(function(result) {
      })   
    })
  }
}