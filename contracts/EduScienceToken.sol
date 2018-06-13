pragma solidity ^0.4.17;

import "./ERC20Token.sol";

contract EduScienceToken is ERC20Token {

    string public name = "EduScience";
    string public symbol = "ESc";
    string public version = "EduScience Token v1.0"; 

	// Set the total number of tokens.
	constructor (uint256 _initialSupply) public {
		// State variable for the smart contract, written to the blockchain at each modification
		// _variable is for local variables -> Solidity convention
		totalSupply = _initialSupply;

		// Allocate the _initialSupply
		// msg is a global variable in Solidity that has several values. Sender is the address, sent via the metadata in JS
		balanceOf[msg.sender] = _initialSupply;
	}

}