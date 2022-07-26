import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("Campaign Factory", () => {
  let accounts: any;
  let factory: any;
  let campaign: any;
  beforeEach(async () => {
    accounts = await ethers.getSigners();

    const contract = await ethers.getContractFactory("CampaignFactory");
    factory = await contract.deploy();

    await factory.CreateCampaign("1000000000000000000");
    const campaignAddress = await factory.getDeployedCampaigns();
    campaign = await ethers.getContractFactory("Campaign");
  });

  it("deploys a factory and a campaign", () => {
    assert.ok(factory.address);
    assert.ok(campaign.address);
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("`getDeployedCampaigns` fetches the deployed campaigns", async () => {
    const campaigns = await factory.getDeployedCampaigns().call();
    assert.equal(campaigns.length, 1);
    assert.equal(campaigns[0], campaign.options.address);
  });

  it("`getLastCampaign` fetches the last deployed campaign by a user", async () => {
    const campaignAddress = await factory.getLastCampaign(accounts[0]).call();
    assert.equal(campaign.options.address, campaignAddress);
  });
});
