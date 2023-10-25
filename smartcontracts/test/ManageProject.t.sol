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
        stablecoin.mint(address(this), 10000);
        //SetUp Stablecoin
        for(uint i = 1; i < 10; i++){
            stablecoin.mint(address(uint160(i)), 10000);
        }
    }

    function test_setUpProject() public{
        assertEq(project.fundsToRaise(), fundsToRaise);
        assertEq(project.stableCoin(), address(stablecoin));
        assertEq(project.name(), projectName);
        assertEq(project.symbol(), projectSymbol);
    }

    function test_invest_failed_NotApproved(uint _amount) public{
        vm.assume(_amount > 0 && _amount < fundsToRaise);
        vm.startPrank(address(uint160(0)));
            vm.expectRevert();
            project.invest(_amount);
        vm.stopPrank();
    }

    function test_invest_failed_AmountGreaterFunds(uint _amount) public{
        vm.assume(_amount > fundsToRaise);
        vm.startPrank(address(uint160(0)));
            vm.expectRevert("Amount greater than remaining amount");
            project.invest(_amount);
        vm.stopPrank();
    }

    function test_invest_failed_WhenSaleNotActive(uint _amount) public{
        vm.assume(_amount > 0 && _amount < fundsToRaise);
            project.stopProject();
        vm.startPrank(address(uint160(0)));
            vm.expectRevert("Sale not active");
            project.invest(_amount);
        vm.stopPrank();
    }

    function test_invest_worksIfApprovedAndCriteriaMet_RightAmountOfFunds(uint _amount) public{
        vm.assume(_amount > 0 && _amount < fundsToRaise);
        vm.startPrank(address(uint160(1)));
            stablecoin.approve(address(project), _amount);
            assertEq(stablecoin.allowance(address(uint160(1)),address(project)),_amount);
            project.invest(_amount);
        vm.stopPrank();
    }

    function test_invest_receiveRightAmountOfFunds(uint _amount) public {
        vm.assume(_amount > 0 && _amount < fundsToRaise);
        vm.startPrank(address(uint160(1)));
            assertEq(project.balanceOf(address(uint160(1))),0);
            stablecoin.approve(address(project), _amount);
            project.invest(_amount);
            assertEq(project.balanceOf(address(uint160(1))),_amount);
        vm.stopPrank();
    }

    function test_renewProject_FailIfNotOwner() public{
        vm.startPrank(address(uint160(1)));
            vm.expectRevert();
            project.renewProject();
        vm.stopPrank();
    }

    function test_renewProject_FailIfTimeNotPassed() public{
        vm.expectRevert("Not enough time passed");
        project.renewProject();
    }

    function test_renewProject_WorksIfTimePassed() public{
        vm.warp(block.timestamp + 30 days);
        project.renewProject();
    }

    function test_renewProject_FailedAfterTimeSet() public{
        vm.warp(block.timestamp + 30 days);
        project.renewProject();
        vm.expectRevert("Not enough time passed");
        project.renewProject();
    }

    function test_renewProject_raisedFundsUpdatesCorrectly(uint _amount) public {
        vm.assume(_amount > 0 && _amount < fundsToRaise);
        stablecoin.approve(address(project), _amount);
        project.invest(_amount);
        uint raisedAmount = project.raisedFunds();
        assertEq(raisedAmount, _amount);
        vm.warp(block.timestamp + 30 days);
        project.renewProject();
        raisedAmount = project.raisedFunds();
        assertEq(raisedAmount, 0);
    }

    function test_witdraw_notOwnerCantWithdraw() public{
        vm.startPrank(address(uint160(1)));
            vm.expectRevert();
            project.withdraw();
        vm.stopPrank();
    }

    function test_witdraw_correctAmountOfBalanceWitdrawn(uint _amount) public{
        vm.assume(_amount > 0 && _amount < fundsToRaise);
        uint256 startingBalance = stablecoin.balanceOf(address(this));
        vm.startPrank(address(uint160(1)));
            stablecoin.approve(address(project), _amount);
            project.invest(_amount);
        vm.stopPrank();
        project.withdraw();
        uint256 balanceAfterWitdrawal = stablecoin.balanceOf(address(this));
        assertEq(balanceAfterWitdrawal - startingBalance, _amount);
    }


}
