import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'
import getTokenContract from './util/tokenContract/getTokenContract'
import getSaleContract from './util/saleContract/getSaleContract'
import getEduContract from './util/eduContract/getEduContract'
import getAddress from './util/address/getAddress'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import ICOSale from './user/layouts/icosale/ICOSale'
import Transfer from './user/layouts/transfer/Transfer'
import Publish from './user/layouts/publish/Publish'
import Search from './user/layouts/search/Search'
import Profile from './user/layouts/profile/Profile'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

getAddress.then(results => {
  console.log('Address obtained!')
})
.catch(() => {
  console.log('Error in getting address.')
})

getTokenContract.then(results => {
  console.log('TokenContract deployed!')
})
.catch(() => {
  console.log('Error in TokenContract deployment.')
})

getSaleContract.then(results => {
  console.log('SaleContract deployed!')
})
.catch(() => {
  console.log('Error in SaleContract deployment.')
})

getEduContract.then(results => {
  console.log('EduContract deployed!')
})
.catch(() => {
  console.log('Error in EduContract deployment.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="icosale" component={UserIsAuthenticated(ICOSale)} />
          <Route path="transfer" component={UserIsAuthenticated(Transfer)} />
          <Route path="publish" component={UserIsAuthenticated(Publish)} />
          <Route path="search" component={UserIsAuthenticated(Search)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
