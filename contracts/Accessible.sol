pragma solidity 0.4.17;

import "./zeppelin/lifecycle/Killable.sol";

contract Accessible is Killable {

 	// Mapping the accounts.
    mapping(address => bool) public allowedAccounts;
    uint256 public numberOfAccounts;

    event AccessGranted(address newAccount);
    event AccessRemoved(address removedAccount);

    modifier onlyOwnerOrAllowed() {
        require(msg.sender == owner || allowedAccounts[msg.sender]);
        _;
    }

    modifier onlyAllowedAccount() {
        require(allowedAccounts[msg.sender]);
        _;
    }

    // Address(0) is the burnAddress.
    function grantAccess(address newAccount) public onlyOwnerOrAllowed {
    	// Check if is not the burnAddress and if not granted
        require(newAccount != address(0) && !allowedAccounts[newAccount]);
        allowedAccounts[newAccount] = true;
        numberOfAccounts += 1;

        require(numberOfAccounts != 0);
        // Emit event
        emit AccessGranted(newAccount);
    }

    function removeAccess(address removeAccount) public onlyOwnerOrAllowed {
    	// Check if already granted
        require(allowedAccounts[removeAccount]);
        require (numberOfAccounts >= 1);
        allowedAccounts[removeAccount] = false;
        numberOfAccounts -= 1;
        // Emit event
        emit AccessRemoved(removeAccount);
    }
}