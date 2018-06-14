import store from '../../../store'
import swal from 'sweetalert'


export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

export function updateUser(name) {
  let contractEduInstance = store.getState().eduContract.eduContract
  let coinbase = store.getState().address.address
  return function(dispatch) {
    contractEduInstance.update(name, {from: coinbase}).then(function(result) {
      swal('Name updated!', 'Transaction successful!','success')
      dispatch(userUpdated({"name": name}))
    }).catch(function(result) {
      // ERROR
    })
  }
}