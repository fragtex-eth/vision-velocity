// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ManageProject is  ERC20,Ownable {
    uint256 immutable public fundsToRaise;
    uint256 public raisedFunds;
    uint256 public totalRaisedFunds;
    address public USDTaddress = address(0);
    bool public active = true;
    uint256 lastUpdatedTimeStamp;
    constructor(uint256 _fundsToRaiste, string memory _name, string memory _symbol) ERC20(_name, _symbol) Ownable(msg.sender){
        fundsToRaise = _fundsToRaiste;
        lastUpdatedTimeStamp = block.timestamp;
    }

    function invest(uint256 amount) external {
        require(active, "Project not active");
        require(raisedFunds + amount <= fundsToRaise, "Already raised the funds");
        totalRaisedFunds += amount;
        raisedFunds += amount;
        bool success = ERC20(USDTaddress).transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer failed");
        _mint(msg.sender, amount);
    }

    function stopProject() external onlyOwner {
        active = false;
    }

    function renewProject() external onlyOwner {
        require(block.timestamp >= (lastUpdatedTimeStamp + 30 days), "Not enough time passed");
        lastUpdatedTimeStamp = block.timestamp;
        raisedFunds = 0;
    }

    function withdraw() external onlyOwner {
        bool success = ERC20(USDTaddress).transferFrom(address(this), msg.sender, ERC20(USDTaddress).balanceOf(address(this)));
        require(success, "Transfer failed");
    }
}
