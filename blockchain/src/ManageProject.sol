// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ManageProject {
    uint256 immutable public fundsToRaise;

    constructor(uint256 _fundsToRaiste){
        fundsToRaise = _fundsToRaiste;
        
    }

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
