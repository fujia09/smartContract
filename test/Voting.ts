import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting Contract", function () {
  let Voting, voting: any;
  const candidate1 = "Harry";
  const candidate2 = "Ron";

  beforeEach(async () => {
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
  });

  it("should add candidates correctly", async function () {
    await voting.addCandidate(candidate1);
    await voting.addCandidate(candidate2);

    const runner1 = await voting.runners(0);
    expect(runner1).to.equal(candidate1);

    const runner2 = await voting.runners(1);
    expect(runner2).to.equal(candidate2);
  });

  it("should record votes correctly", async function () {
    // Add candidates before voting
    await voting.addCandidate(candidate1);
    await voting.addCandidate(candidate2);

    await voting.vote(candidate1);
    const votesForHarry = await voting.getCandidateVotes(candidate1);
    expect(votesForHarry).to.equal(1);

    await voting.vote(candidate2);
    await voting.vote(candidate2);

    const votesForRon = await voting.getCandidateVotes(candidate2);
    expect(votesForRon).to.equal(2);
  });

  it("should retrieve vote counts correctly", async function () {
    // Add candidates before voting
    await voting.addCandidate(candidate1);
    await voting.addCandidate(candidate2);

    await voting.vote(candidate1);
    await voting.vote(candidate2);
    await voting.vote(candidate2);

    const votesForHarry = await voting.getCandidateVotes(candidate1);
    const votesForRon = await voting.getCandidateVotes(candidate2);

    expect(votesForHarry).to.equal(1);
    expect(votesForRon).to.equal(2);
  });

  it("should revert if voting for a non-existent candidate", async function () {
    const notCandidate = "Hermione";
    await expect(voting.vote(notCandidate)).to.be.revertedWith("candidate does not exist");
  });
});
