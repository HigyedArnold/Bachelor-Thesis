var EduScience = artifacts.require("./EduScienceToken.sol");
var EduScienceSale = artifacts.require("./EduScienceTokenSale.sol");

contract("EduScienceSale", function(accounts) {
	var tokenInstance;
  	var tokenSaleInstance;
  	var admin = accounts[0];
  	var buyer = accounts[1];
 	  var tokenPrice = 1000000000000000; // Wei = 0.001 Ether
  	var tokensAvailable = 75000000;
  	var tokensAmount;
    var days = 1;

  	it("EduScienceSale contract test\\/", function() {
   		return EduScienceSale.deployed().then(function(instance) {
      	tokenSaleInstance = instance;
      	return tokenSaleInstance.address;
    }).then(function(address) {
      	assert.notEqual(address, 0x0, "EduScienceSale address is not 0x0!");
    //   	return tokenSaleInstance.tokenContract(); Made private
    // }).then(function(address) {
    //   	assert.notEqual(address, 0x0, "EduScience address is not 0x0!");
      	return tokenSaleInstance.tokenPrice();
    }).then(function(price) {
      	assert.equal(price.toNumber(), tokenPrice, "Token price set correctly!");
        return tokenSaleInstance.deadline();
    }).then(function(deadline) {
        assert.notEqual(deadline.toNumber(), Date.now(), "Deadline set correctly!");
        return tokenSaleInstance.saleClosed();
    }).then(function(saleClosed) {
        assert.equal(saleClosed, false, "Token sale is not closed!");
    });
  	});

 	it("Token aquisition test\\/", function() {
    	return EduScience.deployed().then(function(instance) {
      	tokenInstance = instance;
      	return EduScienceSale.deployed();
    }).then(function(instance) {
      	tokenSaleInstance = instance;
      	// Transfer initial tokens in the tokenSale contract, 75% of the total supply
      	return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {from: admin });
    }).then(function(receipt) {
      	tokensAmount = 1000;
      	return tokenSaleInstance.buyTokens(tokensAmount, {from: buyer, value: tokensAmount * tokenPrice });
    }).then(function(receipt) {
      	assert.equal(receipt.logs.length, 1, "Event triggered!");
      	assert.equal(receipt.logs[0].event, "Sell", "Expecting Sell event!");
      	assert.equal(receipt.logs[0].args._buyer, buyer, "Buyer account!");
      	assert.equal(receipt.logs[0].args._amount, tokensAmount, "Amount of tokens aquired!");
      	return tokenSaleInstance.tokensSold();
    }).then(function(amount) {
      	assert.equal(amount.toNumber(), tokensAmount, "Amount of tokens sold!");
      	return tokenInstance.balanceOf(buyer);
    }).then(function(balance) {
      	assert.equal(balance.toNumber(), tokensAmount);
      	return tokenInstance.balanceOf(tokenSaleInstance.address);
    }).then(function(balance) {
      	assert.equal(balance.toNumber(), tokensAvailable - tokensAmount);
      	// Try to buy tokens different from the ether value
      return tokenSaleInstance.buyTokens(tokensAmount, {from: buyer, value: 1 });
    }).then(assert.fail).catch(function(error) {
      	assert(error.message.indexOf("revert") >= 0, "msg.value must be equal with the number of tokens in Wei!");
      	return tokenSaleInstance.buyTokens(99999999, {from: buyer, value: tokensAmount * tokenPrice });
    }).then(assert.fail).catch(function(error) {
      	assert(error.message.indexOf("revert") >= 0, "Buying more tokens than available is not permitted!");
    	});
  	});

  	it("Token sale end test\\/", function() {
    	return EduScience.deployed().then(function(instance) {
      	tokenInstance = instance;
      	return EduScienceSale.deployed();
    }).then(function(instance) {
      	tokenSaleInstance = instance;
      	// End sale by other than admin
      	return tokenSaleInstance.endSale({from: buyer });
    }).then(assert.fail).catch(function(error) {
      	assert(error.message.indexOf('revert' >= 0, "Only admin can end sale!"));
      	// End sale by admin
      	return tokenSaleInstance.endSale({from: admin });
    }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert' >= 0, "Sale not met the deadline to be ended!"));
    //   	return tokenInstance.balanceOf(admin);
    // }).then(function(balance) {
    //   	assert.equal(balance.toNumber(), 999000, "Return unsold tokens to admin!");
      	});
  	});

});