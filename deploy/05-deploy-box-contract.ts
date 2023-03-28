import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { ADDRESS_ZERO } from "../hardhat-helper-config";

const deployBox: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log, get } = deployments;

  log("DEPLOYING THE BOX CONTRACT ..................");

  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
  });

  log("TRANSFERRING OWNERSHIP OF BOX CONTRACT ...........................");

  const boxContract = await ethers.getContractAt("Box", box.address);
  const timeLock = await ethers.getContract("TimeLock");

  const transferTx = await boxContract.transferOwnership(timeLock.address);
  await transferTx.wait(1);

  log(
    "OWNERSHIP OF 'BOX' CONTRACT IS TRANSFERRED TO TIMELOCK.........................."
  );
};

export default deployBox;
deployBox.tags = ["all", "box"];
