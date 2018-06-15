var EduScience = artifacts.require("./EduScience.sol");

contract('EduScience', function(accounts) {

  it("EduScience: Authentication and simple publish test\\/", function() {
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
    })
  });
    
});
