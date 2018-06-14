import store from '../../../store'
import swal from 'sweetalert'

export function buyICO(amount) {
  let contractSaleInstance = store.getState().saleContract.saleContract
  let coinbase = store.getState().address.address
  contractSaleInstance.tokenPrice().then(function(tokenPrice) {
    let price = tokenPrice.toNumber()
    contractSaleInstance.buyTokens(amount, {from: coinbase, value: amount * price, gas: 500000}).then(function(result) {
      console.log("Tokens bought: ", amount)
      swal('ICO purchased!', 'Transaction successful!','success')
    }).catch(function(result) {
    })   
  })
}