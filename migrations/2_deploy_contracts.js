var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Accessible = artifacts.require("./Accessible.sol");
/*artifacts -> it is a contract abstraction for truffle, in order to be run in the JS runtime environment
			   for tests, console or client side interation; */
var EduScienceToken = artifacts.require("./EduScienceToken.sol");
var EduScienceTokenSale = artifacts.require("./EduScienceTokenSale.sol");
var EduScience = artifacts.require("./EduScience.sol");

// WARNING: Abstract/Interface contracts can not be deployed -> will result in a migration error!
module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Accessible);
  deployer.deploy(Accessible);
  deployer.link(Accessible, EduScience);
  deployer.link(Accessible, EduScienceToken);
  // Assure in a promise that it will be created after the EduScienceToken
  deployer.deploy(EduScienceToken, 100000000).then(function() {
    return deployer.deploy(EduScience, EduScienceToken.address).then(function(){
    	// 1000000000000000 Wei = 0.001 Ether
    	// Check: https://etherconverter.online/
    	var tokenPrice = 1000000000000000;
      var tokensAvailable = 75000000;
    	var days = 1;
      deployer.link(Accessible, EduScienceTokenSale);
    	return deployer.deploy(EduScienceTokenSale, EduScienceToken.address, tokensAvailable, tokenPrice, days).then(function() {
        console.log("Granting acces from EduScienceToken to EduScienceTokenSale!");
        console.log("Granting acces from EduScienceToken to EduScience!");
        // Acces is granted, but its functionalities won't be used, since other addresses should be able
        // to transfer tokens in the EduScienceToken. Access granting is great for functions with restrictions,
        // meaning that a contract might use b's contract function, if it is allowed.
        // For security purposes among contract interactions.
        EduScienceToken.at(EduScienceToken.address).grantAccess(EduScienceTokenSale.address);
        EduScienceToken.at(EduScienceToken.address).grantAccess(EduScience.address);
      });
    });
  });
};
