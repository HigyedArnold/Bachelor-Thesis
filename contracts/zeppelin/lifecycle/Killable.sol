pragma solidity ^0.4.17;

import "./../ownership/Ownable.sol";

// Base contract that can be killed by owner. All funds in contract will be sent to the owner.
contract Killable is Ownable {

  function kill() public onlyOwner {
    selfdestruct(owner);
  }

}
