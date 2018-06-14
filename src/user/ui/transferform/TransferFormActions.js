import store from '../../../store'
import swal from 'sweetalert'

export function transfer(amount, toAddress) {
  let contractTokenInstance = store.getState().tokenContract.tokenContract
  let coinbase = store.getState().address.address
  contractTokenInstance.transfer(toAddress, amount, {from: coinbase}).then(function(result) {
    console.log("Tokens transferred: ", amount)
    swal('Tokens transferred!', 'Transaction successful!','success')
  }).catch(function(result) {
  })
}