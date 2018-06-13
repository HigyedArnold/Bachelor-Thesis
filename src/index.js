import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'
import getTokenContract from './util/tokenContract/getTokenContract'
import getSaleContract from './util/saleContract/getSaleContract'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import ICOSale from './user/layouts/icosale/ICOSale'
import Publish from './user/layouts/publish/Publish'
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

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="icosale" component={UserIsAuthenticated(ICOSale)} />
          <Route path="publish" component={UserIsAuthenticated(Publish)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
