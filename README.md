# Contracts Readme

This repository contains four Solidity contracts:

- GovernorContract: A contract that implements a governor mechanism with voting, quorum, and timelock control.
- TimeLock: A contract that implements a timelock mechanism for delaying contract executions.
- Box: A contract that simply stores and retrieves a uint256 value.
- GovernanceToken: A contract that implements an ERC20 token with voting power for use in the governor mechanism.

## GovernorContract

GovernorContract is the main contract of this repository. It implements a governor mechanism that allows token holders to propose and vote on changes to the contract. The contract supports voting with a quorum and a timelock mechanism for delaying the execution of proposals.

### Dependencies

GovernorContract relies on the following OpenZeppelin libraries:

- Governor
- GovernorSettings
- GovernorCountingSimple
- GovernorVotes
- GovernorVotesQuorumFraction
- GovernorTimelockControl

### Usage

To use GovernorContract, you need to provide it with a token contract that implements the IVotes interface, a TimelockController contract, and some parameters to configure the voting and quorum mechanisms.

### Public Functions

GovernorContract exposes the following public functions:

- propose: Allows a token holder to propose a change to the contract.
- state: Returns the state of a proposal (i.e., pending, canceled, or executed).
- proposalThreshold: Returns the number of votes required to create a proposal.
- votingDelay: Returns the minimum delay between the proposal and the start of the voting period.
- votingPeriod: Returns the length of the voting period.
- quorum: Returns the quorum required for a proposal to be considered valid.
- supportsInterface: Checks if the contract implements a given interface.
- _cancel: Cancels a proposal.
- _execute: Executes a proposal.
- _executor: Returns the address of the timelock executor.

## TimeLock

TimeLock is a contract that implements a timelock mechanism for delaying contract executions. It is used by GovernorContract.

### Dependencies

TimeLock relies on the following OpenZeppelin libraries:

- TimelockController

### Usage

To use TimeLock, you need to provide it with a minimum delay, a list of proposers, a list of executors, and an owner.

### Public Functions

TimeLock exposes the following public functions:

- delay: Returns the minimum delay between a proposal and its execution.
- GRANT_ROLE: Role that allows for adding and removing proposers.
- REVOKE_ROLE: Role that allows for adding and removing executors.
- TIMELOCK_ADMIN_ROLE: Role that allows for changing the minimum delay.
- grantRole: Grants a role to an address.
- revokeRole: Revokes a role from an address.
- renounceRole: Renounces a role.
- hasRole: Checks if an address has a role.
- getRoleAdmin: Returns the admin role of a role.
- getRoleMember: Returns the member addresses of a role.
- getRoleMemberCount: Returns the number of members in a role.

## Box

The Box contract allows the owner to store and retrieve a uint256 value. It emits an event `ValueChanged` every time the value is changed.

### Dependencies

Box depends on the OpenZeppelin `Ownable` contract, which provides the `onlyOwner` modifier to restrict access to certain functions.

### Usage

To use Box, you need to deploy the contract and call the `store` function to set the initial value. After that, you can call the `store` function to update the value and the `retrieve` function to read it.

### Public Functions

Box exposes the following public functions:

- `store`: Allows the owner to store a new value.
- `retrieve`: Returns the current value.

## GovernanceToken

The GovernanceToken contract is an ERC20 token with voting power for use in the governor mechanism. It allows token holders to vote on proposals and delegates their voting power to other addresses. The contract is initialized with an initial supply of tokens that are minted to the contract deployer.

### Dependencies

GovernanceToken depends on the OpenZeppelin `ERC20Votes` contract, which extends the ERC20 token standard with vote counting functionalities.

### Usage

To use GovernanceToken, you need to deploy the contract and mint the initial supply of tokens. After that, the tokens can be transferred to other addresses and used for voting on proposals.

### Public Functions

GovernanceToken exposes the following public functions:

- `vote`: Allows a token holder to vote on a proposal.
- `delegate`: Allows a token holder to delegate their voting power to another address.
- `registerSnapshot`: Registers a snapshot of the token distribution for historical vote counting purposes.
- `getVotes`: Returns the number of votes an address has at the current block.
- `getPastVotes`: Returns the number of votes an address had at a previous block.
- `balanceOf`: Returns the balance of tokens an address has.
- `totalSupply`: Returns the total supply of tokens.

## HOW TO DEPLOY

You can deploy the code in this repository by running
    npx hardhat deploy --network localhots

## RUN SCRIPTS
You can run the scripts by running
    npx hardhat run scripts//*name of script*/ 