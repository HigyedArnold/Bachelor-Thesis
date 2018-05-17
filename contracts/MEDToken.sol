pragma solidity ^0.4.17;

contract MEDToken {

	// Name
	string public name = "MEDher";

	// Symbol
	string public symbol = "MED";

	// Standard
	string public standard = "MEDher Token v1.0";

	/* Since the modifier is public, Solidity already
	provides a getter function for the variable. 
	-> from the ERC20 standard (EIPs/eip-20) */
	// Get the total number of tokens
	uint256 public totalSupply;

	/* Take the address of an owner and return the
	balance of that particular address. */
	mapping (address => uint256) public balanceOf;
	
	/* Allowance map. Owner as 1st key holds a map to
	all approvements with key spender and value amount. */
	mapping (address => mapping (address => uint256)) public allowance;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value);

	event Approval(
		address indexed _owner,
		address indexed _spender,
		uint256 _value);

	// Constructor
	// Set the total number of tokens
	constructor (uint256 _initialSupply) public {
		/* State variable for the smart contract,
		written to the blockchain at each modification. */
		// _variable is for local variables -> Solidity convention
		totalSupply = _initialSupply;

		// Allocate the _initialSupply
		/* msg is a global variable in Solidity that has several values.
		Sender is the address, sent via the metadata in JS.
		*/
		balanceOf[msg.sender] = _initialSupply;
	}

	// Transfer
	// Triggers a Transfer event
	// Throws Exception if insufficient funds
	function transfer(address _to, uint256 _value) public returns (bool success){
		require (balanceOf[msg.sender] >= _value);
		
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;

		emit Transfer(msg.sender, _to, _value);

		return true;
	}

	// Approve
	// Triggers Approve event
	function approve(address _spender, uint256 _value) public returns (bool success) {
		allowance[msg.sender][_spender] = _value;

		emit Approval(msg.sender, _spender, _value);

		return true;
	}

	// TransferFrom
	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		require (balanceOf[_from] >= _value);
		require (allowance[_from][msg.sender] >= _value);
		
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		allowance[_from][msg.sender] -= _value;

		emit Transfer(_from, _to, _value);

		return true;
	}
}