import { browserHistory } from 'react-router'
import store from '../../../store'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance;
  let contractEduInstance = store.getState().eduContract.eduContract
  let coinbase = store.getState().address.address
  return function(dispatch) {
    contractEduInstance.login({from: coinbase}, function(error, result) {
      if (error) {
        // If error, go to signup page.
        console.error('Wallet ' + coinbase + ' does not have an account!')
        return browserHistory.push('/signup')
      }
      var userName = web3.toUtf8(result)
      dispatch(userLoggedIn({"name": userName}))
      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()
      if ('redirect' in currentLocation.query) {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }
      return browserHistory.push('/dashboard')
    })
  }
}