import store from '../../../store'
import swal from 'sweetalert'

export function transfer(amount, toAddress) {
  let contractTokenInstance = store.getState().tokenContract.tokenContract
  let coinbase = store.getState().address.address
  contractTokenInstance.transfer(toAddress, amount, {from: coinbase}, function(error, result) {
    if (error) {
      return swal('Error.')
    }
    console.log("Tokens transferred: ", amount)
    swal('Tokens transferred!', 'Transaction successful!','success')
  })
}

export function approve(apamount, apAddress) {
  let contractTokenInstance = store.getState().tokenContract.tokenContract
  let coinbase = store.getState().address.address
  contractTokenInstance.approve(apAddress, apamount, {from: coinbase}, function(error, result) {
    if (error) {
      return swal('Error.')
    }
    console.log("Tokens approved: ", apamount)
    swal('Tokens approved!', 'Transaction successful!','success')
  })
}

export function transferFrom(framount, frAddress, frToAddress) {
  let contractTokenInstance = store.getState().tokenContract.tokenContract
  let coinbase = store.getState().address.address
  contractTokenInstance.transferFrom(frAddress, frToAddress, framount, {from: coinbase}, function(error, result) {
    if (error) {
      return swal('Error.')
    }
    console.log("Tokens transferred: ", framount)
    swal('Tokens transferred!', 'Transaction successful!','success')
  })
}