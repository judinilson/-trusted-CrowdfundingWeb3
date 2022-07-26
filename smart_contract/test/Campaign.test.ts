import { expect, assert } from "chai";
import { ethers } from "hardhat";

const transformSummary = (summary: any) => ({
  manager: summary[0],
  balance: summary[1],
  minimumContribution: summary[2],
  requestsCount: summary[3],
  numContributors: summary[4],
});

const assertSummary = (summary: any, expected: any) => {
  expect(summary.manager).to.equal(expected.manager);
  expect(summary.balance).to.equal(expected.balance);
  expect(summary.minimumContribution).to.equal(expected.minimumContribution);
  expect(summary.requestsCount).to.equal(expected.requestsCount);
  expect(summary.numberContributors).to.equal(expected.numberContributors);
};

describe("Campaign", () => {
  let accounts: any;
  let campaign: any;
  const OneEther = ethers.utils.parseEther("1");
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const contract = await ethers.getContractFactory("Campaign");

    campaign = await contract.deploy(OneEther, accounts[0].address);
  });
  it("deploys a campaign", () => {
    assert.ok(campaign.address);
  });
  it("allows users to contribute money", async () => {
    await campaign.contribute().send({
      from: accounts[1].address,
      value: OneEther,
    });

    const isAcc01Contributor = await campaign.isContributor(accounts[1]).call();
    assert(isAcc01Contributor);

    const isAcc02Contributor = await campaign.isContributor(accounts[2]).call();
    assert(!isAcc02Contributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.contribute().send({
        from: accounts[1],
        value: 0.001,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("restricts users from making a payment request", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    try {
      await campaign
        .createRequest(0.001, accounts[2])
        .send({ from: accounts[1], gas: OneEther });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  it("allows manager to create a payment request", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    const request = await campaign.requests(0).call();
    assert.equal(request.value, 10_000);
    assert.equal(request.recipient, accounts[2]);
  });

  it("restricts creation of a payment request requiring more funds than available", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    try {
      await campaign
        .createRequest(30_000, accounts[2])
        .send({ from: accounts[0], gas: OneEther });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows contributors to vote on a request", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    await campaign.approveRequest(0).send({ from: accounts[1], gas: OneEther });

    const request = await campaign.requests(0).call();
    const isApprover = await campaign.isApprover(accounts[1], 0).call();

    assert.equal(request.approvalCount, 1);
    assert(isApprover);
  });

  it("restricts non-contributors from voting", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    try {
      await campaign
        .approveRequest(0)
        .send({ from: accounts[2], gas: OneEther });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows manager to finalize a payment request", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(OneEther, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    await campaign.approveRequest(0).send({ from: accounts[1], gas: OneEther });

    const initialBalance = await ethers
      .getDefaultProvider()
      .getBalance(accounts[2]);

    await campaign
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: OneEther });
    const finalBalance = await ethers
      .getDefaultProvider()
      .getBalance(accounts[2]);
    const request = await campaign.requests(0).call();
    assert(request.complete);

    //assert.equal(finalBalance - initialBalance, OneEther);
  });

  it("restricts non-manager from finalizing a request", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    await campaign.approveRequest(0).send({ from: accounts[1], gas: OneEther });

    try {
      await campaign
        .finalizeRequest(0)
        .send({ from: accounts[0], gas: OneEther });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("restricts finalizing a request without majority vote", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    try {
      await campaign
        .finalizeRequest(0)
        .send({ from: accounts[0], gas: OneEther });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("restricts finalizing a request without sufficient funds", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    await campaign
      .createRequest(20_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    await campaign.approveRequest(1).send({ from: accounts[1], gas: OneEther });

    await campaign
      .finalizeRequest(1)
      .send({ from: accounts[0], gas: OneEther });

    try {
      await campaign
        .finalizeRequest(0)
        .send({ from: accounts[0], gas: OneEther });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("`getRequestCount` returns the correct count", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    let requestCount = await campaign.getRequestCount().call();
    assert.equal(requestCount, 1);

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    requestCount = await campaign.getRequestCount().call();
    assert.equal(requestCount, 2);
  });

  it("`getRequestCount` returns the correct count", async () => {
    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    let requestCount = await campaign.getRequestCount().call();
    assert.equal(requestCount, 1);

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    requestCount = await campaign.getRequestCount().call();
    assert.equal(requestCount, 2);
  });

  it("can fetch the campaign summary", async () => {
    let summary = transformSummary(await campaign.getSummary().call());
    assertSummary(summary, {
      manager: accounts[0],
      balance: 0,
      minimumContribution: 10_000,
      requestsCount: 0,
      numContributors: 0,
    });

    await campaign.contribute().send({
      from: accounts[1],
      value: OneEther,
    });

    summary = transformSummary(await campaign.getSummary().call());
    assertSummary(summary, {
      manager: accounts[0],
      balance: OneEther,
      minimumContribution: 10_000,
      requestsCount: 0,
      numContributors: 1,
    });

    await campaign
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: OneEther });

    summary = transformSummary(await campaign.getSummary().call());
    assertSummary(summary, {
      manager: accounts[0],
      balance: OneEther,
      minimumContribution: 10_000,
      requestsCount: 1,
      numContributors: 1,
    });

    await campaign.approveRequest(0).send({ from: accounts[1], gas: OneEther });
    await campaign
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: OneEther });

    summary = transformSummary(await campaign.getSummary().call());
    assertSummary(summary, {
      manager: accounts[0],
      balance: 10_000,
      minimumContribution: 10_000,
      requestsCount: 1,
      numContributors: 1,
    });
  });
});
