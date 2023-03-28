import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("DEPLOYING GOVERNANCE TOKEN...................");

  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    //waitConfirmations
  });

  log("01 ---- DEPLOYED GOVERNANCE TOKEN AT ....", governanceToken.address);

  //DELEGATE
  await delegate(governanceToken.address, deployer);
  log("---------01-DELEGATED----------");
};

export default deployGovernanceToken;
deployGovernanceToken.tags = ["all", "governanceToken"];

const delegate = async (
  governanceTokenAddress: string,
  delegatedAccount: string
) => {
  const governanceToken = await ethers.getContractAt(
    "GovernanceToken",
    governanceTokenAddress
  );

  const txResponse = await governanceToken.delegate(delegatedAccount);

  await txResponse.wait(1);

  console.log(
    `checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`
  );
};
