// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Test, console2} from "forge-std/Test.sol";
import {VVFactory} from "../src/VVFactory.sol";
import {ManageProject} from "../src/ManageProject.sol";
import {Stablecoin} from "../src/mock/Stablecoin.sol";

contract FactoryTest is Test {
    VVFactory public factory;
    ManageProject public project;
    Stablecoin public stablecoin;
    string public projectName = "TestName";
    string public projectSymbol = "TestSymbol";
    uint256 public fundsToRaise = 9000;

    function setUp() public {
        stablecoin = new Stablecoin();
        factory = new VVFactory();
        project = factory.createProject(fundsToRaise, projectName, projectSymbol, address(stablecoin));
    }

    function test_setUpProject() public{
        assertEq(project.fundsToRaise(), fundsToRaise);
        assertEq(project.stableCoin(), address(stablecoin));
        assertEq(project.name(), projectName);
        assertEq(project.symbol(), projectSymbol);
    }

    function test_invest() public{

    }
}
