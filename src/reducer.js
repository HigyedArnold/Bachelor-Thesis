import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import web3Reducer from './util/web3/web3Reducer'
import tokenContractReducer from './util/tokenContract/tokenContractReducer'
import saleContractReducer from './util/saleContract/saleContractReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  tokenContract: tokenContractReducer,
  saleContract: saleContractReducer
})

export default reducer
