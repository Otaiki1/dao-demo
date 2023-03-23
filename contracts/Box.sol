// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable{
    uint256 private value;

    event ValueChanged(uint256 newValue);

    function store(uint256 _newValue) public onlyOwner{
        value = _newValue;

        emit ValueChanged(_newValue);
    }

    function retrieve() public view returns(uint256){
        return value;
    }
}
