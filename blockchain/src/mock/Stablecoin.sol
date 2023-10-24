// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Stablecoin is ERC20 {
    constructor() ERC20("Stablecoin", "STB") {}
    
    //No modifier | testing
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}