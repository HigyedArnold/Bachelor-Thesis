var MEDToken = artifacts.require("./MEDToken.sol");

contract("MEDToken", function(accounts) {
  var tokenInstance;

	it("MEDToken contract test\\/", function() {
		return MEDToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name) {
			assert.equal(name, "MEDher", "Name test!");
			return tokenInstance.symbol();
		}).then(function(symbol) {
			assert.equal(symbol, "MED", "Symbol test!");
			return tokenInstance.standard();
		}).then(function(standard) {
			assert.equal(standard, "MEDher Token v1.0");
		});
	});

	it("Total supply test\\/", function() {
		return MEDToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 1000000, "Sets the total supply to 1.000.000!");
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber(), 1000000, "Initial supply allocated to admin account!");
		});
	});

	it("Transfer test\\/", function() {
		return MEDToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.transfer.call(accounts[1], 999999999);
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf("revert") >= 0, "Error message must contain: revert!");
			return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0] });
		}).then(function(success) {
			assert.equal(success, true, "Transfer succesfull!");
			return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0] });
		}).then(function(receipt) {
			 assert.equal(receipt.logs.length, 1, "Event triggered!");
      		 assert.equal(receipt.logs[0].event, "Transfer", "Expecting Transfer event!");
      		 assert.equal(receipt.logs[0].args._from, accounts[0], "From address!");
      		 assert.equal(receipt.logs[0].args._to, accounts[1], "To address!");
      		 assert.equal(receipt.logs[0].args._value, 250000, "Transfer amount!");
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 250000, "Transfer test!");
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 750000, "Transfer test!");
		});
	});

	it("Delegated transfer approval test\\/", function() {
    	return MEDToken.deployed().then(function(instance) {
    		tokenInstance = instance;
     		return tokenInstance.approve.call(accounts[1], 100);
    	}).then(function(success) {
     		assert.equal(success, true, "Approve success!");
      		return tokenInstance.approve(accounts[1], 100, {from: accounts[0] });
    	}).then(function(receipt) {
      		assert.equal(receipt.logs.length, 1, "Event triggered!");
     		assert.equal(receipt.logs[0].event, "Approval", "Expecting Approval event!");
      		assert.equal(receipt.logs[0].args._owner, accounts[0], "From address!");
      		assert.equal(receipt.logs[0].args._spender, accounts[1], "To address!");
      		assert.equal(receipt.logs[0].args._value, 100, "Approved amount!");
      		return tokenInstance.allowance(accounts[0], accounts[1]);
    	}).then(function(allowance) {
      		assert.equal(allowance.toNumber(), 100, "Allowance for delegated transfer!");
    	});
  	});

	it("Delegated transfer test\\/", function() {
    	return MEDToken.deployed().then(function(instance) {
      		tokenInstance = instance;
      		fromAccount = accounts[7];
      		toAccount = accounts[8];
      		callerAccount = accounts[9];
      		// Make a Transfer first
      		return tokenInstance.transfer(fromAccount, 100, {from: accounts[0] });
    	}).then(function(receipt) {
      		// Approve callerAccount to spend 50 tokens form fromAccount
      		return tokenInstance.approve(callerAccount, 50, {from: fromAccount });
    	}).then(function(receipt) {
      		// Try an invalid Transfer, larger then the fromAccount balance
      		return tokenInstance.transferFrom(fromAccount, toAccount, 1000, {from: callerAccount });
    	}).then(assert.fail).catch(function(error) {
     		assert(error.message.indexOf("revert") >= 0, "Not enough balance!");
      		// Try an invalid Transfer, larger then the fromAccount approved amount
      		return tokenInstance.transferFrom(fromAccount, toAccount, 75, {from: callerAccount });
    	}).then(assert.fail).catch(function(error) {
     		assert(error.message.indexOf("revert") >= 0, "Not enough approved balance!");
      		return tokenInstance.transferFrom.call(fromAccount, toAccount, 25, {from: callerAccount });
    	}).then(function(success) {
      		assert.equal(success, true);
      		return tokenInstance.transferFrom(fromAccount, toAccount, 25, {from: callerAccount });
    	}).then(function(receipt) {
      		assert.equal(receipt.logs.length, 1, "Event triggered!");
      		assert.equal(receipt.logs[0].event, "Transfer", "Expecting Transfer event!");
      		assert.equal(receipt.logs[0].args._from, fromAccount, "From address!");
      		assert.equal(receipt.logs[0].args._to, toAccount, "To address!");
      		assert.equal(receipt.logs[0].args._value, 25, "Delegated transfer amount!");
      		return tokenInstance.balanceOf(fromAccount);
    	}).then(function(balance) {
      		assert.equal(balance.toNumber(), 75, "Balance of sending account!");
      		return tokenInstance.balanceOf(toAccount);
    	}).then(function(balance) {
      		assert.equal(balance.toNumber(), 25, "Balance of receiving account!");
      		return tokenInstance.allowance(fromAccount, callerAccount);
    	}).then(function(allowance) {
     		 assert.equal(allowance.toNumber(), 25, "Remaining allowance!");
    	});
  	});

});