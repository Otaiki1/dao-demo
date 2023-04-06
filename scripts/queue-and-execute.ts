import { ethers, network } from "hardhat";
import {
  DESCRIPTION,
  FUNC,
  FUNC_ARG,
  MIN_DELAY,
  developmentChains,
} from "../hardhat-helper-config";
import { moveBlocks, moveTime } from "../helpers";

export async function queueAndExecute(
  functionToCall: string,
  args: number[],
  proposalDescription: string
) {
  const box = await ethers.getContract("Box");

  //getting the bytes for the calldata
  const encodedFunctionCall = await box.interface.encodeFunctionData(
    functionToCall,
    args
  );

  const descriptionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(proposalDescription)
  );

  //queue
  const governor = await ethers.getContract("GovernorContract");

  const queueTx = await governor.queue(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );

  await queueTx.wait(1);

  console.log("PROPOSAL IN QUEUE...................");

  if (developmentChains.includes(network.name)) {
    //moveTime
    await moveTime(MIN_DELAY + 1);
    //moveBlocks
    await moveBlocks(1);
  }
  console.log("TIME MOVED");

  //EXECUTE
  const executeTx = await governor.execute(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );

  await executeTx.wait(1);
  console.log("EXECUTEDDDD....................");

  console.log(`BOX VALUE IS : ${await box.retrieve()}`);
}
queueAndExecute(FUNC, [FUNC_ARG], DESCRIPTION)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
