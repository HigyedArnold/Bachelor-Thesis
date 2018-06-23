import store from '../../../store'
import swal from 'sweetalert'

export function buyICO(amount) {
  let contractSaleInstance = store.getState().saleContract.saleContract
  let coinbase = store.getState().address.address
  contractSaleInstance.tokenPrice(function(error, tokenPrice) {
    if (error) {
      return swal('Error.')
    }
    let price = tokenPrice.toNumber()
    contractSaleInstance.buyTokens(amount, {from: coinbase, value: amount * price, gas: 500000}, function(error, result) {
      if (error) {
        return swal('Error.')
      }
      console.log("Tokens bought: ", amount)
      swal('ICO purchased!', 'Transaction successful!','success')
    })   
  })
}