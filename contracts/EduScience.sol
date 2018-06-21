pragma solidity 0.4.17;

import "./Accessible.sol";
import "./EduScienceToken.sol";

contract EduScience is Accessible {

  // All state variables have an initial state

  struct User {
    bytes32 name;
  }

  // Title must be bytes to use it as a key for mapping, string is not supported.
  struct Data {
    // The link to the stored data
    string ipfsHash;
    // Publisher unique address
    address publisher;
    // Title of the data
    bytes32 title;
    // Popularity, can be voted only up
    uint256 popularity;
    // For existence check
    uint256 time;
  }

  EduScienceToken private tokenContract;

  mapping (address => User) public users;
  
  // A
  // 1 address -> 1,2,...n -> data1,data2,...datan
  mapping (address => mapping (uint256 => Data)) private addressData;
  mapping (address => mapping (uint256 => Data)) private userPurchasedData;
  // 1 address -> n
  mapping (address => uint256) public addressCount;
  mapping (address => uint256) public userPurchasedCount;
  // 1 title -> 1 data
  
  // B
  mapping (bytes32 => Data) private titleData;
  // All titles of data
  bytes32[] private titles;
  // Titles count
  uint256 public titlesCount;

  uint256 public accessFee = 6;
  uint256 public popularityFee = 2;

  // Bytes not supported for ipfsHash -> utf58 encoding, not utf8 provided by web3.
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
    // Must be an empty slot
    require (titleData[_title].time == 0);

    // On entry 0 nothing stored for maps
    uint256 n = ++addressCount[msg.sender];
    titlesCount++;

    require (n != 0);
    require (titlesCount != 0);

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

  // For the list population.
  function getTitle(uint256 _index) constant public onlyExistingUser returns (bytes32) {
    // Check if data exists for this entry
    require (titles[_index] != 0x0);
    return titles[_index];
  }

  function getPublisher(bytes32 _title) constant public onlyExistingUser returns (address) {
    // Check if data exists for this entry
    require (titleData[_title].time != 0);
    return titleData[_title].publisher;
  }

  function getPopularity(bytes32 _title) constant public onlyExistingUser returns (uint256) {
    // Check if data exists for this entry
    require (titleData[_title].time != 0);
    return titleData[_title].popularity;
  }

  function getPublishTime(bytes32 _title) constant public onlyExistingUser returns (uint256) {
    // Check if data exists for this entry
    require (titleData[_title].time != 0);
    return titleData[_title].time;
  }

  function purchaseIpfsAfterTitle(bytes32 _title) public onlyExistingUser {
    // Check if data exists for this entry
    require (titleData[_title].time != 0);
    // Why to buy your own work?
    require (titleData[_title].publisher != msg.sender);

    // Check if not already purchased
    for (uint256 i = 0; i < userPurchasedCount[msg.sender]; i++) {
      // Title must be different, a new one.
      require (userPurchasedData[msg.sender][i].title != _title);
    }

    // Make the transaction fee 
    require (tokenContract.transfer(msg.sender, titleData[_title].publisher, accessFee));
    uint256 n = ++userPurchasedCount[msg.sender];
    userPurchasedData[msg.sender][n].ipfsHash = titleData[_title].ipfsHash;
    userPurchasedData[msg.sender][n].publisher = titleData[_title].publisher;
    userPurchasedData[msg.sender][n].title = titleData[_title].title;
    userPurchasedData[msg.sender][n].popularity = titleData[_title].popularity;
    userPurchasedData[msg.sender][n].time = titleData[_title].time;
  }

  function getIpfsAfterTitle(bytes32 _title) public constant onlyExistingUser returns (string) {
    // Check if data exists for this entry
    require (titleData[_title].time != 0);
    // Or purchased work
    for (uint256 i = 1; i <= userPurchasedCount[msg.sender]; i++) {
      if (userPurchasedData[msg.sender][i].title == _title) {
        return userPurchasedData[msg.sender][i].ipfsHash;
      }
    }
    // Or own work
    for (uint256 j = 1; j <= addressCount[msg.sender]; j++) {
      if (addressData[msg.sender][j].title == _title) {
        return addressData[msg.sender][j].ipfsHash;
      }
    }
    // Not available
    return "NA";
  }

  function votePopularity(bytes32 _title) public onlyExistingUser {
    // Check if data exists for this entry
    require (titleData[_title].time != 0);
    // Can't increase your own popularity
    require (titleData[_title].publisher != msg.sender);
    // Make the transaction fee first
    require (tokenContract.transfer(msg.sender, titleData[_title].publisher, popularityFee));

    ++titleData[_title].popularity;
  }

  function getTitleAddress(uint256 _index) constant public onlyExistingUser returns (bytes32) {
    require (addressData[msg.sender][_index].time != 0);
    return addressData[msg.sender][_index].title;
  }

  function getPurchaseAddress(uint256 _index) constant public onlyExistingUser returns (bytes32) {
    require (userPurchasedData[msg.sender][_index].time != 0);
    return userPurchasedData[msg.sender][_index].title;
  }

  function getTimestamp() internal view returns (uint256) {
    return now;
  }

  function getBlockNumber() internal view returns (uint256) {
    return block.number;
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