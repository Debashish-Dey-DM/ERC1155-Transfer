// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Test {
    address public owner;
    event OwnerChanged(address owner);
    mapping(address => uint256) public balanceOf;
    uint8 public decimals = 18;
    address[] public users;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        balanceOf[owner] = 1e20;
        users.push(owner);
    }

    function changeOwner(address _owner) public onlyOwner {
        owner = _owner;
        emit OwnerChanged(_owner);
    }
}
