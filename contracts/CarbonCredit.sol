// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CarbonCredit is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private creditId_;
    mapping(address => bool) public creditCreators;
    mapping(uint256 => string) public idToUrl;

    address public owner;

    constructor() ERC1155("") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function createCreditor(address _creditor) public onlyOwner {
        creditCreators[_creditor] = true;
    }

    function mint(uint256 amount, string memory url) public {
        require(creditCreators[msg.sender], "Not a creditor");
        creditId_.increment();

        idToUrl[creditId_.current()] = url;
        _mint(msg.sender, creditId_.current(), amount, "");
    }

    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) public {
        _burn(account, id, amount);
    }
}
