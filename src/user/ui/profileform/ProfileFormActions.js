import EduScienceContract from '../../../../build/contracts/EduScience.json'
import store from '../../../store'
import swal from 'sweetalert'

const contract = require('truffle-contract')

export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

export function updateUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the EduScience object.
      const EduScience = contract(EduScienceContract)
      EduScience.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on EduScience.
      var EduScienceInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error)
        }

        EduScience.deployed().then(function(instance) {
          EduScienceInstance = instance

          // Attempt to login user.
          EduScienceInstance.update(name, {from: coinbase})
          .then(function(result) {
            swal('Name updated!', 'Transaction successful!','success')
            return dispatch(userUpdated({"name": name}))
          })
          .catch(function(result) {
            // ERROR
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.')
  }
}