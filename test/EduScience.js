var EduScience = artifacts.require("./EduScience.sol");
var title;

contract('EduScience', function(accounts) {

  it("Authentication, publish and search after title and address test\\/", function() {
    return EduScience.deployed().then(function(instance) {
      eduScienceInstance = instance;
      return eduScienceInstance.signup("test1", {from: accounts[0]});
    }).then(function() {
      return eduScienceInstance.login();
    }).then(function(name) {
      assert.equal(web3.toUtf8(name), "test1", "The user test signed up!");
      return eduScienceInstance.signup("test2", {from: accounts[1]});
    }).then(function() { 
      return eduScienceInstance.publish("QMTest", "Test", {from:accounts[0]});
    }).then(function(result) {
      return eduScienceInstance.titlesCount();
    }).then(function(count) {
      assert.equal(count.toNumber(), 1, "The user test published one work!");
      return eduScienceInstance.getTitle(count.toNumber() - 1);
    }).then(function(result) {
      title = result;
      assert.equal(web3.toUtf8(title), "Test", "Title of the published work matches!");
      return eduScienceInstance.getPublisher(title);
    }).then(function(publisher) {
      assert.equal(publisher, accounts[0], "Account 0 is the publisher!");
      return eduScienceInstance.getPopularity(title);
    }).then(function(popularity) {
      assert.equal(popularity.toNumber(), 0, "Initial popularity is 0!");
      return eduScienceInstance.getPublishTime(title);
    }).then(function(time) {
      assert.notEqual(time.toNumber(), 0, "Time is: " + time.toNumber());
      return eduScienceInstance.purchaseIpfsAfterTitle(title, {from:accounts[0]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf("revert") >= 0, "Error message must contain: revert!");
      return eduScienceInstance.getIpfsAfterTitle(title, {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest", "IPFS hash stored correctly!");
      return eduScienceInstance.votePopularity(title, {from: accounts[0]})
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf("revert") >= 0, "Error message must contain: revert!");
      return eduScienceInstance.getPopularity(title, {from: accounts[0]})
    }).then(function(popularity) {
      assert.equal(popularity.toNumber(), 0, "Popularity is: " + popularity.toNumber());
      return eduScienceInstance.addressCount(accounts[0]);
    }).then(function(count) {
      assert.equal(count.toNumber(), 1, "Articles published by account 0!");
      return eduScienceInstance.getTitleAddress(1);
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test", "Title of the published work matches!");
      return eduScienceInstance.publish("QMTest2", "Test2", {from:accounts[0]});
     }).then(function(result) {
       return eduScienceInstance.getIpfsAfterTitle("Test2", {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "Test2", "IPFS hash stored correctly!");
      return eduScienceInstance.addressCount(accounts[0]);
    }).then(function(count) {
      assert.equal(count.toNumber(), 2, "The user test published two works!");
      return eduScienceInstance.getTitleAddress(2);
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test2", "Title of the published work matches!");
      return eduScienceInstance.getTitle(1);
    }).then(function(result) {
      title = result;
      assert.equal(web3.toUtf8(title), "Test2", "Title of the published work matches!");
      return eduScienceInstance.getPublisher(title);
    }).then(function(publisher) {
      assert.equal(publisher, accounts[0], "Account 0 is the publisher!");
      return eduScienceInstance.getPopularity(title);
    }).then(function(popularity) {
      assert.equal(popularity.toNumber(), 0, "Initial popularity is 0!");
      return eduScienceInstance.getPublishTime(title);
    }).then(function(time) {
      assert.notEqual(time.toNumber(), 0, "Time is: " + time.toNumber());
     return eduScienceInstance.purchaseIpfsAfterTitle(title, {from:accounts[0]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf("revert") >= 0, "Error message must contain: revert!");
      return eduScienceInstance.getIpfsAfterTitle(title, {from:accounts[1]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "NA", "IPFS hash stored correctly!");
      return eduScienceInstance.votePopularity(title, {from: accounts[1]})
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf("revert") >= 0, "Error message must contain: revert!");
      return eduScienceInstance.getPopularity(title, {from: accounts[1]})
    }).then(function(popularity) {
      assert.equal(popularity.toNumber(), 0, "Popularity is: " + popularity.toNumber());
      return eduScienceInstance.getIpfsAfterTitle(title, {from:accounts[1]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "NA", "IPFS hash stored correctly!");
    })
  });

 it("Authentication, search test\\/", function() {
    return EduScience.deployed().then(function(instance) {
      eduScienceInstance = instance;
      return eduScienceInstance.publish("QMTest11", "Test11", {from:accounts[0]});
    }).then(function(result) {
      return eduScienceInstance.publish("QMTest12", "Test12", {from:accounts[0]});
    }).then(function(result) {
      return eduScienceInstance.publish("QMTest21", "Test21", {from:accounts[1]});
    }).then(function(result) {
      return eduScienceInstance.publish("QMTest22", "Test22", {from:accounts[1]});
    }).then(function(result) {
      return eduScienceInstance.getIpfsAfterTitle("Test11", {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest11", "IPFS hash stored correctly!");
      return eduScienceInstance.getIpfsAfterTitle("Test12", {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest12", "IPFS hash stored correctly!");
      return eduScienceInstance.getIpfsAfterTitle("Test21", {from:accounts[1]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest21", "IPFS hash stored correctly!");
      return eduScienceInstance.getIpfsAfterTitle("Test22", {from:accounts[1]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest22", "IPFS hash stored correctly!");
      return eduScienceInstance.getIpfsAfterTitle("Test11", {from:accounts[1]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "NA", "IPFS hash stored correctly!");
      return eduScienceInstance.getIpfsAfterTitle("Test12", {from:accounts[1]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "NA", "IPFS hash stored correctly!");
      return eduScienceInstance.getIpfsAfterTitle("Test21", {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "NA", "IPFS hash stored correctly!");
      return eduScienceInstance.getIpfsAfterTitle("Test22", {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "NA", "IPFS hash stored correctly!");
      return eduScienceInstance.purchaseIpfsAfterTitle("Test21", {from:accounts[0]});
    }).then(function(tx) {
      return eduScienceInstance.purchaseIpfsAfterTitle("Test22", {from:accounts[0]});
    }).then(function(tx) {
      return eduScienceInstance.getIpfsAfterTitle("Test21", {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest21", "IPFS hash stored correctly!");
      return eduScienceInstance.getIpfsAfterTitle("Test22", {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest22", "IPFS hash stored correctly!");
      return eduScienceInstance.userPurchasedCount(accounts[0]);
    }).then(function(count) {
      assert.equal(count.toNumber(), 2, "2 items purchased!");
      return eduScienceInstance.addressCount(accounts[0]);
    }).then(function(count) {
      assert.equal(count.toNumber(), 4, "4 items published!");
       return eduScienceInstance.userPurchasedCount(accounts[1]);
    }).then(function(count) {
      assert.equal(count.toNumber(), 0, "0 items purchased!");
      return eduScienceInstance.addressCount(accounts[1]);
    }).then(function(count) {
      assert.equal(count.toNumber(), 2, "2 items published!");
      return eduScienceInstance.getPurchaseAddress(1,{from:accounts[0]});
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test21", "Get article 1 from account 0!");
      return eduScienceInstance.getPurchaseAddress(2,{from:accounts[0]});
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test22", "Get article 2 from account 0!");
      return eduScienceInstance.getTitleAddress(3,{from:accounts[0]});
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test11", "Get article 1 from account 0!");
      return eduScienceInstance.getTitleAddress(4,{from:accounts[0]});
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test12", "Get article 2 from account 0!");
      return eduScienceInstance.getTitleAddress(1,{from:accounts[1]});
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test21", "Get article 1 from account 1!");
      return eduScienceInstance.getTitleAddress(2,{from:accounts[1]});
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test22", "Get article 2 from account 1!");
    })
  });

});
