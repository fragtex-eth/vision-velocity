// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ManageProject is  ERC20,Ownable {
    uint256 immutable public fundsToRaise;
    uint256 public raisedFunds;
    uint256 public totalRaisedFunds;
    address public stableCoin;
    bool public active = true;
    uint256 lastUpdatedTimeStamp;

    event MoneyInvested(address indexed investor, uint256 amount);
    event ProjectRenewed(uint256 timeStamp);
    event Withdrawal(address receiver, uint256 amount);
    event ProjectStopped();

    constructor(uint256 _fundsToRaiste, string memory _name, string memory _symbol, address _stablecoin) ERC20(_name, _symbol) Ownable(msg.sender){
        fundsToRaise = _fundsToRaiste;
        stableCoin = _stablecoin;
        lastUpdatedTimeStamp = block.timestamp;
    }

    function invest(uint256 amount) external {
        require(active, "Project not active");
        require(raisedFunds + amount <= fundsToRaise, "Already raised the funds");
        totalRaisedFunds += amount;
        raisedFunds += amount;
        bool success = ERC20(stableCoin).transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer failed");
        _mint(msg.sender, amount);
        emit MoneyInvested(msg.sender, amount);
    }

    function stopProject() external onlyOwner {
        active = false;
        emit ProjectStopped();
    }

    function renewProject() external onlyOwner {
        require(block.timestamp >= (lastUpdatedTimeStamp + 30 days), "Not enough time passed");
        lastUpdatedTimeStamp = block.timestamp;
        raisedFunds = 0;
        emit ProjectRenewed(lastUpdatedTimeStamp);
    }

    function withdraw() external onlyOwner {
        uint256 amount = ERC20(stableCoin).balanceOf(address(this));
        bool success = ERC20(stableCoin).transferFrom(address(this), msg.sender, amount);
        require(success, "Transfer failed");
        emit Withdrawal(msg.sender, amount);
    }
}
