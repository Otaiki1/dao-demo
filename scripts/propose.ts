import { ethers, network } from "hardhat";
import {
  DESCRIPTION,
  FUNC,
  FUNC_ARG,
  PROPOSAL_FILE,
  VOTING_DELAY,
  developmentChains,
} from "../hardhat-helper-config";
import { moveBlocks } from "../helpers";

import * as fs from "fs";

export async function makeProposal(
  functionToCall: string,
  args: number[],
  proposalDescription: string
) {
  const governor = await ethers.getContract("GovernorContract");
  const box = await ethers.getContract("Box");

  //getting the bytes for the calldata
  const encodedFunctionCall = await box.interface.encodeFunctionData(
    functionToCall,
    args
  );

  //making a call to tyeh propose function

  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  );

  const proposeReceipt = await proposeTx.wait(1);

  if (developmentChains.includes(network.name)) {
    //moveTime
    await moveBlocks(VOTING_DELAY + 1);
  }

  const proposalId = proposeReceipt.events[0].args.proposalId;
  console.log(`Proposal Id is ${proposalId.toString()}`);

  fs.writeFileSync(
    PROPOSAL_FILE,
    JSON.stringify({
      [network.config.chainId!.toString()]: [proposalId.toString()],
    })
  );
}
makeProposal(FUNC, [FUNC_ARG], DESCRIPTION)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
