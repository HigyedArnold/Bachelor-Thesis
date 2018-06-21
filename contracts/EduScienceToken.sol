pragma solidity 0.4.17;

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

	// Same as the normal transfer, but this is for interior usage, fee perception.
	// Major security breach: this function should be called only from other contracts => modifier onlyOwnerOrAllowed.
	function transfer(address _from, address _to, uint256 _value) public onlyOwnerOrAllowed returns (bool success){
		// Have sufficient funds.
		require (balanceOf[_from] >= _value);
		// Transfer amount must be greater than 0.
		require (_value > 0);
		// Overflow check.
		require (balanceOf[_to] + _value > balanceOf[_to]);
		
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;

		require (balanceOf[_to] != 0);

		emit Transfer(_from, _to, _value, balanceOf[_from]);

		return true;
	}
}