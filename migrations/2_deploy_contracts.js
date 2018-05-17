/* Read the MEDToken solidity contract;
artifacts -> it is a contract abstraction for truffle,
				in order to be run in the JS runtime environment
				for tests, console or client side interation; */
var MEDToken = artifacts.require("./MEDToken.sol");
var MEDTokenSale = artifacts.require("./MEDTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(MEDToken, 1000000).then(function() {
  	// 1000000000000 Wei = 0.000001 Ether
  	// Check: https://etherconverter.online/
  	var tokenPrice = 1000000000000;
  	return deployer.deploy(MEDTokenSale, MEDToken.address, tokenPrice);
  });
};
