pragma solidity 0.4.23;

import "./Token.sol";
import "./Accessible.sol";

contract ERC20Token is Token, Accessible {
	// Since the modifier is public, Solidity already provides a getter function for the variable. 
	uint256 public totalSupply;

	// Take the address of an owner and return the balance of that particular address.
	mapping (address => uint256) public balanceOf;
	
	// Allowance map. 'owner' as 1st key holds a map to all approvements with key 'spender' and value 'amount'.
	mapping (address => mapping (address => uint256)) public allowance;

	// function totalSupply() public constant returns (uint256 totalSupply) {
	// 	return totalSupply;
	// }

	// function balanceOf(address _owner) public constant returns (uint256 balance) {
 	//  return balanceOf[_owner];
 	// }

 	// Return true or throw an exception and revert the transfer.
 	// In case of revert will consume gas till the point that not meets the requierements.
	function transfer(address _to, uint256 _value) public returns (bool success){
		// Have sufficient funds.
		require (balanceOf[msg.sender] >= _value);
		// Transfer amount must be greater than 0.
		require (_value > 0);
		// Overflow check.
		require (balanceOf[_to] + _value > balanceOf[_to]);
		
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;

		require (balanceOf[_to] != 0);

		emit Transfer(msg.sender, _to, _value, balanceOf[msg.sender]);

		return true;
	}

 	// Return true or throw an exception and revert the transferFrom.
 	// In case of revert will consume gas till the point that not meets the requierements.
	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		// Have sufficient funds.
		require (balanceOf[_from] >= _value);
		// Have sufficient allowance.
		require (allowance[_from][msg.sender] >= _value);
		// Transfer amount must be greater than 0.
		require (_value > 0);
		
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;

		require (balanceOf[_to] != 0);
		allowance[_from][msg.sender] -= _value;

		emit Transfer(_from, _to, _value, balanceOf[msg.sender]);

		return true;
	}

	function approve(address _spender, uint256 _value) public returns (bool success) {
		allowance[msg.sender][_spender] += _value;

		emit Approval(msg.sender, _spender, _value);

		return true;
	}

    // function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {}
    //   return allowance[_owner][_spender];
    // }
}