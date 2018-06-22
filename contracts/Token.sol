pragma solidity 0.4.23;

interface Token {

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value,
		uint256 _balance);

    event Approval(
    	address indexed _owner,
    	address indexed _spender,
    	uint256 _value);

    // OBSERVATION

    // Function must have been commented in this abstract contract because:
    // - in solidity defining a variable as public, automatically the language provides a getter for it;
    // - since the variable and the function name is the same, the next contract, implementing the
    //   abstract contract (inteface) will be considered abstract since shadowing occurs;
    // - if in a hierarchy all contracts are abstract, their deployment will result in a failure; 

	// @return The total amount of tokens.
	// function totalSupply() external constant returns (uint256 supply);

	// @param _owner The address from which the balance will be retrieved.
	// @return The balance of that account / address.
	// function balanceOf(address _owner) external constant returns (uint256  balance);

	// @notice Transfer '_value' token from 'msg.sender' to '_to'.
	// @notice Emits Transfer event.
	// @param _to The address of the recipient.
	// @param _value The amount of token to be transferred.
	// @param {from: ...} The address of the sender (Metadata).
	// @return Whether the transfer was succesfull or not.
	function transfer(address _to, uint256 _value) external constant returns (bool success);

	// @notice Transfer '_value' token from '_from' to '_to' if amount is approved by '_from'.
	// @notice Emits Transfer event.
    // @param _from The address of the sender.
    // @param _to The address of the recipient.
	// @param _value The amount of token to be transferred.
	// @return Whether the transfer was succesfull or not.
	function transferFrom(address _from, address _to, uint256 _value) external constant returns (bool success);

	// @notice 'msg.sender' approves '_spender' to spend '_value' tokens.
	// @notice Emits Approval event.
    // @param _spender The address of the account able to transfer the tokens.
    // @param _value The amount of Wei to be approved for transfer.
    // @return Whether the approval was successful or not.
    function approve(address _spender, uint256 _value) external constant  returns (bool success);

    // @param _owner The address of the account owning tokens.
    // @param _spender The address of the account able to transfer the tokens.
    // @return Amount of remaining tokens allowed to be spent.
    // function allowance(address _owner, address _spender) external constant returns (uint256 remaining);
}