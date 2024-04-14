// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Claim {
    uint[] public amount;
    bool[] public available;
    address payable public owner;

    event EtherReceived(address sender, uint amount);
    
    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
            amount.push(msg.value);
            available.push(true);
            owner = payable(msg.sender);
    }


    function claim(address payable to, uint id) payable public {
        if (available[id]){
            to.transfer(amount[id]);
            available[id] = false;
        }
    }

    function del(uint id) payable public {
        if (available[id]){
            owner.transfer(amount[id]);
            available[id] = false;
        }
    }
}