pragma solidity ^0.4.17;
// pragma -> instruction for the compiler to include only once in the compilation.
// solidity <version> -> compiler.

import "./Accessible.sol";
import "./EduScienceToken.sol";

contract EduScienceTokenSale is Accessible {
	
	address admin;
	EduScienceToken public tokenContract;
	uint256 public tokensAvailable;
	uint256 public tokenPrice;
	uint256 public tokensSold;
	uint256 public deadline;
	bool public saleClosed = false;
	bool endSaleOnce = false;

	// _; -> The function body where the modifier is used.
	// Can be use onlyOwner from Ownable.
	modifier onlyAdmin() {
		require (admin == msg.sender);
		_;
	}

	modifier saleOpen() {
		require (!saleClosed);
		require (now <= deadline);
		_;
	}

	modifier afterSale() {
		require (now >= deadline);
		_;
	}

    modifier noReentrancy() {
        require(!endSaleOnce);
        _;
        endSaleOnce = false;
    }

    // Events are for the clients to react on changes effieciently.
	event Sell(
		address _buyer,
		uint256 _amount,
		uint256 _tokensSold,
		uint256 _tokensAvailable,
		uint256 _balance);

	event SaleClosed(
		address recipient,
		uint256 tokensSold);

	constructor(EduScienceToken _tokenContract, uint256 _tokensAvailable, uint256 _tokenPrice, uint256 _days) public {		
		// Assign an admin
		admin = msg.sender;
		// Token contract
		tokenContract = _tokenContract;
		tokensAvailable = _tokensAvailable;
		// Token price
		tokenPrice = _tokenPrice;
		tokensSold = 0;
		// Time when the token sale ends
		deadline = now + _days * 1 days;
		require (deadline != 0);
	}

	// Buy tokens used by the client side only while sale is open.
	// Payable allows a function to receive ether while being called.
	function buyTokens(uint256 _tokenAmount) public payable saleOpen {
		require (msg.value == mul(_tokenAmount, tokenPrice));
		require (tokenContract.balanceOf(this) >= _tokenAmount);
		// revert if transaction unsuccessful
		require (tokenContract.transfer(msg.sender, _tokenAmount));
		
		tokensAvailable -= _tokenAmount;
		// Keep track of the sold tokens
		tokensSold += _tokenAmount;

		require (tokensSold != 0);
		// Trigger Sell event
		emit Sell(msg.sender, _tokenAmount, tokensSold, tokensAvailable, tokenContract.balanceOf(msg.sender));
	}

	// Ending the token sale only after sale (deadline passed) and only once.
	function endSale() public onlyAdmin afterSale noReentrancy {
		// Require admin
		// Transfer remaining tokens to admin
		require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));
		
		// Destroy contract -> not anymore
		// Keep contract to see the 'saleClosed' variable in order to update the front end
		saleClosed = true;
		emit SaleClosed(msg.sender, tokensSold);
		// selfdestruct(admin);
	}

	// UTIL: multiply
	// https://github.com/dapphub/ds-math
	// Functions can be declared pure in which case they promise not to read from or modify the state.
	// internal -> visible only inside the contract.
	// pure -> not reading or writing data to the blockchain.

	// Considering it secure from overflow.
	function mul(uint x, uint y) internal pure returns (uint z) {
		require(y == 0 || (z = x * y) / y == x);
	}

}