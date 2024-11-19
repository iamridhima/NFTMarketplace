// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {BaseNft} from "src/BaseNft.sol";

contract DeployBaseNft is Script {
    function run() external returns (BaseNft) {
        vm.startBroadcast();
        BaseNft baseNft = new BaseNft("CuteLilMonster", "CLM");
        vm.stopBroadcast();
        return baseNft;
    }
}
