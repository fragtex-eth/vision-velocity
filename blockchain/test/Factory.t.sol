// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Test, console2} from "forge-std/Test.sol";
import {VVFactory} from "../src/VVFactory.sol";

contract FactoryTest is Test {
    VVFactory public factory;

    function setUp() public {
        factory = new VVFactory();
    }

    function test_createProject(uint256 fundsToRaise, string memory name, string memory symbol) public{
        factory.createProject(fundsToRaise, name, symbol);
        assertEq(factory.ownerProject(1), address(this));
    }
}
