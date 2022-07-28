import { ethers } from "hardhat";
const fs = require("fs");
const path = require("path");

async function main() {
  const accounts = await ethers.getSigners();
  const minimum = ethers.utils.parseEther("1");
  console.log("Attempting to deploy from account", accounts[0]);
  const Campaign = await ethers.getContractFactory("CampaignFactory");
  const campaign = await Campaign.deploy();

  await campaign.deployed();

  console.log("Contract deployed to", campaign.address);
  console.log("Saving Deployed Address...");
  const filePath = path.resolve(__dirname, "..", "build", "address.json");
  const deployedAddress = JSON.stringify({
    Campaign: campaign.address,
  });

  fs.writeFileSync(filePath, deployedAddress);

  console.log("Deployed Address Saved!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
