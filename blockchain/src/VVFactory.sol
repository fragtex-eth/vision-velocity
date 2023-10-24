// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;
import "./ManageProject.sol";

contract VVFactory {
    ManageProject[] public activeProjects;
    mapping(uint => address) public ownerProject;

    event ProjectCreated(uint indexed id, string name);

    function createProject(uint256 _fundsToRaise, string calldata _name, string calldata _symbol) public returns(address sender){
        ManageProject project = new ManageProject( _fundsToRaise, _name, _symbol);
        activeProjects.push(project);
        uint256 id = activeProjects.length;
        ownerProject[id] = msg.sender;
        emit ProjectCreated(id, _name);
        return msg.sender;
    }
}