pragma solidity ^0.4.17;

// Provides onlyOwner modifier, which prevents function from running if it is called by anyone other than the owner.
contract Ownable {

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    if (msg.sender == owner)
      _;
  }

  // Address(0) is the burnAddress.
  function transferOwnership(address newOwner) public onlyOwner {
    if (newOwner != address(0)) owner = newOwner;
  }

}