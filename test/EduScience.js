var EduScience = artifacts.require("./EduScience.sol");

contract('EduScience', function(accounts) {

  it("EduScience: Authentication test\\/", function() {
    return EduScience.deployed().then(function(instance) {
      eduScienceInstance = instance;
      return eduScienceInstance.signup("test", {from: accounts[0]});
    }).then(function() {
      return eduScienceInstance.login.call();
    }).then(function(name) {
      assert.equal(web3.toUtf8(name), "test", "The user did not sign up.");
    });
  });

});
