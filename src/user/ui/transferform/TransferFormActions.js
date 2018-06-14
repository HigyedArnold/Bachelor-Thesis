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

export function approve(apamount, apAddress) {
  let contractTokenInstance = store.getState().tokenContract.tokenContract
  let coinbase = store.getState().address.address
  contractTokenInstance.approve(apAddress, apamount, {from: coinbase}).then(function(result) {
    console.log("Tokens approved: ", apamount)
    swal('Tokens approved!', 'Transaction successful!','success')
  }).catch(function(result) {
  })
}

export function transferFrom(framount, frAddress, frToAddress) {
  let contractTokenInstance = store.getState().tokenContract.tokenContract
  let coinbase = store.getState().address.address
  contractTokenInstance.transferFrom(frAddress, frToAddress, framount, {from: coinbase}).then(function(result) {
    console.log("Tokens transferred: ", framount)
    swal('Tokens transferred!', 'Transaction successful!','success')
  }).catch(function(result) {
  })
}