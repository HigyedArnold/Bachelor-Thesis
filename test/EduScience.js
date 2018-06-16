var EduScience = artifacts.require("./EduScience.sol");
var title;

contract('EduScience', function(accounts) {

  it("Authentication, publish and search after title and address test\\/", function() {
    return EduScience.deployed().then(function(instance) {
      eduScienceInstance = instance;
      return eduScienceInstance.signup("test", {from: accounts[0]});
    }).then(function() {
      return eduScienceInstance.login();
    }).then(function(name) {
      assert.equal(web3.toUtf8(name), "test", "The user test signed up!");
      return eduScienceInstance.publish("QMTest", "Test", {from:accounts[0]});
    }).then(function(result) {
      return eduScienceInstance.titlesCount();
    }).then(function(count) {
      assert.equal(count.toNumber(), 1, "The user test published one work!");
      return eduScienceInstance.getTitle(count.toNUmber - 1);
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
      return eduScienceInstance.getIpfsAfterTitle.call(title, {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest", "IPFS hash stored correctly!");
      return eduScienceInstance.votePopularity.call(title, {from: accounts[0]})
    }).then(function(popularity) {
      assert.equal(popularity.toNumber(), 1, "Popularity is: " + popularity.toNumber());
      return eduScienceInstance.addressCount(accounts[0]);
    }).then(function(count) {
      assert.equal(count.toNumber(), 1, "Articles published by account 0!");
      return eduScienceInstance.getTitleAddress(1);
    }).then(function(title) {
      assert.equal(web3.toUtf8(title), "Test", "Title of the published work matches!");
      return eduScienceInstance.publish("QMTest2", "Test2", {from:accounts[0]});
     }).then(function(result) {
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
      return eduScienceInstance.getIpfsAfterTitle.call(title, {from:accounts[0]});
    }).then(function(ipfs) {
      assert.equal(ipfs, "QMTest2", "IPFS hash stored correctly!");
      return eduScienceInstance.votePopularity.call(title, {from: accounts[0]})
    }).then(function(popularity) {
      assert.equal(popularity.toNumber(), 1, "Popularity is: " + popularity.toNumber());
    })
  });

});
