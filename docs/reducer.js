import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import web3Reducer from './util/web3/web3Reducer'
import tokenContractReducer from './util/tokenContract/tokenContractReducer'
import saleContractReducer from './util/saleContract/saleContractReducer'
import eduContractReducer from './util/eduContract/eduContractReducer'
import addressReducer from './util/address/addressReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  tokenContract: tokenContractReducer,
  saleContract: saleContractReducer,
  eduContract: eduContractReducer,
  address: addressReducer
})

export default reducer
