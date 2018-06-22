import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'
import swal from 'sweetalert'

export function signUpUser(name) {
  let web3 = store.getState().web3.web3Instance;
  let contractEduInstance = store.getState().eduContract.eduContract
  let coinbase = store.getState().address.address
  return function(dispatch) {
    contractEduInstance.user(name, {from: coinbase}, function(error, nameExists) {
      if (error) {
        return swal('Error.')
      }
      if (web3.toUtf8(nameExists) !== "null") {
        swal('Account already registered under ' + web3.toUtf8(nameExists) + '!', 'To update name go to the Profile section.', 'warning')
        return dispatch(loginUser())
      } else {
        contractEduInstance.signup(name, {from: coinbase}, function(error, result) {
          if (error) {
            return swal('Error.')
          }
          swal('Signed up!', 'Transaction successful!','success')
          return dispatch(loginUser())
        })
      }
    })
  }
}