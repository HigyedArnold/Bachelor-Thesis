/* Read the EduScienceToken solidity contract;
artifacts -> it is a contract abstraction for truffle,
				in order to be run in the JS runtime environment
				for tests, console or client side interation; */
var EduScienceToken = artifacts.require("./EduScienceToken.sol");
var EduScienceTokenSale = artifacts.require("./EduScienceTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(EduScienceToken, 1000000).then(function() {
  	// 1000000000000000 Wei = 0.001 Ether
  	// Check: https://etherconverter.online/
  	var tokenPrice = 1000000000000000;
  	return deployer.deploy(EduScienceTokenSale, EduScienceToken.address, tokenPrice);
  });
};
