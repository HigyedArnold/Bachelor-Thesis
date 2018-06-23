import store from '../../store'

export const SALE_CONTRACT = 'SALE_CONTRACT'
function saleContract(contract) {
  return {
    type: SALE_CONTRACT,
    payload: contract
  };
}

let getSaleContract = new Promise(function(resolve, reject) {
  window.addEventListener('load', function(dispatch) {
    let web3 = store.getState().web3.web3Instance;
    if (typeof web3 !== 'undefined') {
      const address = '0x28C60F640589d1d4fB7F2e1C315A4405a871210B';
      const abi = [{"constant":false,"inputs":[{"name":"newAccount","type":"address"}],"name":"grantAccess","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numberOfAccounts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"deadline","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"endSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensAvailable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"removeAccount","type":"address"}],"name":"removeAccess","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"saleClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allowedAccounts","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_tokenContract","type":"address"},{"name":"_tokensAvailable","type":"uint256"},{"name":"_tokenPrice","type":"uint256"},{"name":"_days","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_buyer","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_tokensSold","type":"uint256"},{"indexed":false,"name":"_tokensAvailable","type":"uint256"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"Sell","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"tokensSold","type":"uint256"}],"name":"SaleClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAccount","type":"address"}],"name":"AccessGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"removedAccount","type":"address"}],"name":"AccessRemoved","type":"event"}]
      const Contract = web3.eth.contract(abi)
      console.log('SaleContract stored!');
      var instance = {
        saleContract: Contract.at(address)
      }
      resolve(store.dispatch(saleContract(instance)))
    }
  })
})

export default getSaleContract
