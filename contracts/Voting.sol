// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting {
    string[] public runners;
    mapping(string => uint256) private votes;

    constructor() {}

    function addCandidate(string memory _runner) public {
        runners.push(_runner);
    }

    function vote(string memory _runner) public {
        bool candidateExists = false;
        for (uint i = 0; i < runners.length; i++) {
            if (
                keccak256(abi.encodePacked(runners[i])) ==
                keccak256(abi.encodePacked(_runner))
            ) {
                candidateExists = true;
                break;
            }
        }

        require(candidateExists, "candidate does not exist");
        votes[_runner]++;
    }

    function getCandidateVotes(
        string memory _runner
    ) public view returns (uint256) {
        return votes[_runner];
    }
}
