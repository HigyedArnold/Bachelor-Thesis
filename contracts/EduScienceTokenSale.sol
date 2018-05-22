pragma solidity ^0.4.17;

import "./EduScienceToken.sol";

contract EduScienceTokenSale {
	address admin;
	EduScienceToken public tokenContract;
	uint256 public tokenPrice;
	uint256 public tokensSold;

	modifier onlyAdmin() {
		require (admin == msg.sender);
		_;
	}

	event Sell(
		address _buyer,
		uint256 _amount);

	// Constructor
	constructor(EduScienceToken _tokenContract, uint256 _tokenPrice) public {
		// Assign an admin
		admin = msg.sender;
		// Token contract
		tokenContract = _tokenContract;
		// Token price
		tokenPrice = _tokenPrice;
		tokensSold = 0;
	}

	// Buy tokens used by the client side
	function buyTokens(uint256 _tokenAmount) public payable {
		require (msg.value == mul(_tokenAmount, tokenPrice));
		require (tokenContract.balanceOf(this) >= _tokenAmount);
		// revert if transaction unsuccessful
		require (tokenContract.transfer(msg.sender, _tokenAmount));
		
		// Keep track of the sold tokens
		tokensSold += _tokenAmount;
		// Trigger Sell event
		emit Sell(msg.sender, _tokenAmount);
	}

	// Ending the token sale
	function endSale() public onlyAdmin {
		// Require admin
		// Transfer remaining tokens to admin
		require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));
		// Destroy contract
		selfdestruct(admin);
	}

	// UTIL: multiply
	// https://github.com/dapphub/ds-math
	function mul(uint x, uint y) internal pure returns (uint z) {
		// internal -> visible only inside the contract
		// pure -> not reading or writing data to the blockchain
		require(y == 0 || (z = x * y) / y == x);
	}
}