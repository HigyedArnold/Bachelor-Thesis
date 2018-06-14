pragma solidity ^0.4.17;

import "./Accessible.sol";

contract EduScience is Accessible {

  // ---------------- Aunthentication part ---------------- //
  struct User {
    bytes32 name;
  }

  mapping (address => User) public users;

  modifier onlyExistingUser {
    // Check if user exists or terminate
    require(!(users[msg.sender].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name) {
    // Only valid names allowed
    require(!(name == 0x0));
    _;
  }

  function login() public constant onlyExistingUser returns (bytes32) {
    return (users[msg.sender].name);
  }

  // Precheck for user existance.
  // constant -> do not modify the state of the contract (same as view).
  function user(bytes32 name) public constant onlyValidName(name) returns (bytes32) {
     if (users[msg.sender].name == 0x0) {
        return "null";
     }
     return users[msg.sender].name;
  }

  function signup(bytes32 name) public payable onlyValidName(name) returns (bytes32) {
    // Check if user exists
    // If yes, return user name
    // If no, check if name was sent
    // If yes, create and return user
    if (users[msg.sender].name == 0x0) {
        users[msg.sender].name = name;
        return (users[msg.sender].name);
    }

    return (users[msg.sender].name);
  }

  function update(bytes32 name) public payable onlyValidName(name) onlyExistingUser returns (bytes32) {
    // Update user name
    if (users[msg.sender].name != 0x0) {
        users[msg.sender].name = name;
        return (users[msg.sender].name);
    }
  }
  // ---------------- Aunthentication part ---------------- //
  // ----------------    IPFS test part    ---------------- //

  mapping (address => string) public datas;

  event Store(
    address publisher,
    string ipfsHash);

  function storeData(string _ipfsHash) public {
    datas[msg.sender] = _ipfsHash;
    emit Store(msg.sender, _ipfsHash);
  }

  function getData() public constant returns (string) {
    return datas[msg.sender];
  }
  // ----------------    IPFS test part    ---------------- //

}