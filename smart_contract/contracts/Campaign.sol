// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Campaigns
/// @author Mr.Black
/// @notice That this contract will be able to create new
//campaign on the blockchain and allow user to fund campaigns
/// @dev every variable and methods are explicitly named for better understanding

contract CampaignFactory {
    //instance variables
    address[] public deployedCampaigns;
    mapping(address => address) public lastCampaignMap;

    //Methods
    function CreateCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
        lastCampaignMap[msg.sender] = newCampaign;
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

    function getLastCampaignMap(address owner) public view returns (address) {
        return lastCampaignMap[owner];
    }
}

contract Campaign {
    // campaign request fund structure
    struct Request {
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    //instance variables
    mapping(address => bool) contributors;
    address public manager;
    uint256 public minimumContribution;
    uint256 public numContributors;
    Request[] public requests;

    // modifiers
    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
        numContributors = 0;
    }

    //methods

    //contribute
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        contributors[msg.sender] = true;
        numContributors++;
    }

    // Creating Request for fund
    function createRequest(uint256 value, address recipient)
        public
        managerOnly
    {
        require(address(this).balance >= value);

        Request storage request = requests.push();
        request.value = value;
        request.recipient = recipient;
        request.complete = false;
        request.approvalCount = 0;
    }

    // approve requested funding
    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(contributors[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    //finalizing funding request
    function finalizeRequest(uint256 index) public payable managerOnly {
        Request storage request = requests[index];

        require(!request.complete);
        require(address(this).balance >= request.value);
        require(request.approvalCount >= (numContributors / 2));

        payable(request.recipient).transfer(request.value);

        request.complete = true;
    }

    function getRequestCount() public view returns (uint256) {
        return requests.length;
    }

    //get all the fields
    function getSummary()
        public
        view
        returns (
            address,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            manager,
            address(this).balance,
            minimumContribution,
            requests.length,
            numContributors
        );
    }

    function isApprover(address contributor, uint256 index)
        public
        view
        returns (bool)
    {
        require(contributors[contributor]);

        Request storage request = requests[index];
        return request.approvals[contributor];
    }

    function isContributor(address contributor) public view returns (bool) {
        return contributors[contributor];
    }
}
