import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployGovernanceToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const {getNamedAccounts, deployments, network} = hre;
  const {deployer} = await getNamedAccounts();
  const{deploy, log} = deployments;

  log("DEPLOYING GOVERNANCE TOKEN...................");

  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args:[],
    log: true,
    //waitConfirmations
  });

  log("01 ---- DEPLOYED GOVERNANCE TOKEN AT ....", governanceToken.address)
};

export default deployGovernanceToken;
deployGovernanceToken.tags = ["all", "governanceToken"];