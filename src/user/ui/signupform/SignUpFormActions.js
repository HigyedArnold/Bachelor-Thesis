import EduScienceContract from '../../../../build/contracts/EduScience.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'
import swal from 'sweetalert'

const contract = require('truffle-contract')

export function signUpUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the EduScience object.
      const EduScience = contract(EduScienceContract)
      EduScience.setProvider(web3.currentProvider)
      var EduScienceInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error)
        }

        EduScience.deployed().then(function(instance) {
          EduScienceInstance = instance

          EduScienceInstance.user(name, {from: coinbase}).then(function(nameExists) {
            if (web3.toUtf8(nameExists) !== "null") {
              swal('Account already registered under ' + web3.toUtf8(nameExists) + '!', 'To update name go to the Profile section.', 'warning')
              return dispatch(loginUser())
            } else {
              EduScienceInstance.signup(name, {from: coinbase}).then(function(result) {
                swal('Signed up!', 'Transaction successful!','success')
                return dispatch(loginUser())
              }).catch(function(result) {
                // ERROR
              });
            }
          });
        });
      });
    };
  } else {
    console.error('Web3 is not initialized.')
  }
}