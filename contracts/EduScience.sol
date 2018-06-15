pragma solidity ^0.4.17;

import "./Accessible.sol";
import "./EduScienceToken.sol";

contract EduScience is Accessible {

  // All state variables have an initial state!!!

  struct User {
    bytes32 name;
  }

  // ----------------    IPFS final part    ---------------- //
  
  struct Data {
    // The link to the stored data
    string ipfsHash;
    // Publisher unique address
    address publisher;
    // Title of the data
    bytes32 title;
    // Popularity, can be voted up/down
    uint256 popularity;
    // For existence check
    uint256 time;
  }

  EduScienceToken public tokenContract;

  mapping (address => User) public users;

  // A
  // 1 address -> 1,2,...n -> data1,data2,...datan
  mapping (address => mapping (uint256 => Data)) private addressData;
  // 1 address -> n
  mapping (address => uint256) public addressCount;
  // 1 title -> 1 data
  
  // B
  mapping (bytes32 => Data) private titleData;
  // All titles of data
  bytes32[] public titles;
  // Titles count
  uint256 public titlesCount;

  // bytes not supported for ipfsHash -> utf58 encoding, not utf8 provided by web3
  event Store(
     address publisher,
     string ipfsHash);

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

  constructor(EduScienceToken _tokenContract) public {
    tokenContract = _tokenContract;
  }

  function publish(string _ipfsHash, bytes32 _title) public onlyValidName(_title) onlyExistingUser {
    require (bytes(_ipfsHash).length < 50);
    require (_title.length < 50);

    uint256 n = ++addressCount[msg.sender];
    titlesCount++;

    addressData[msg.sender][n].ipfsHash = _ipfsHash;
    addressData[msg.sender][n].publisher = msg.sender;
    addressData[msg.sender][n].title = _title;
    addressData[msg.sender][n].popularity = 0;
    addressData[msg.sender][n].time = getTimestamp();

    titleData[_title].ipfsHash = _ipfsHash;
    titleData[_title].publisher = msg.sender;
    titleData[_title].title = _title;
    titleData[_title].popularity = 0;
    titleData[_title].time = getTimestamp();

    titles.push(_title);

    emit Store(msg.sender, _ipfsHash);
  }

  function getTimestamp() internal view returns (uint256) {
    return now;
  }

  function getBlockNumber() internal view returns (uint256) {
    return block.number;
  }

  // ----------------    IPFS final part    ---------------- //
  // ---------------- Aunthentication part ---------------- //

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

  // mapping (address => string) public datas;

  // event Store(
  //   address publisher,
  //   string ipfsHash);

  // function storeData(string _ipfsHash) public {
  //   datas[msg.sender] = _ipfsHash;
  //   emit Store(msg.sender, _ipfsHash);
  // }

  // function getData() public constant returns (string) {
  //   return datas[msg.sender];
  // }

  // ----------------    IPFS test part    ---------------- //
}