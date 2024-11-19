// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {BaseNft} from "src/BaseNft.sol";
import {NFTMarketplace} from "src/NFTMarketplace.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// Constant Variables
    string constant CLM = "ipfs://QmZxjP6aEEaPWDPcq3fhcETPR3a26f7MBKTNqdk1CD9M5J/01-CLM-Metadata.json";
    address constant NFT_ADDRESS = 0x959549d3276A2f24C5d3D41fcfb5D287F2606B01;
    uint256 constant PRICE = 1e18;
    uint256 constant TOKEN_ID = 0;

// NFT Contract
contract MintNft is Script {

    function run() external {
        address mostRecentDeployment = DevOpsTools.get_most_recent_deployment("BaseNft", block.chainid);
        mintNftOnContract(mostRecentDeployment);
    }

    function mintNftOnContract (address _contractAddress) public {
        vm.startBroadcast();
        BaseNft(_contractAddress).mintNft(CLM);
        vm.stopBroadcast();
    }
}

// Marketplace Contract
contract ListNft is Script {
    address ownerNft = 0x756a06A3802Da66c6F5C2bA6370841E1C14f342c;

    function run() external {
        address mostRecentDeployment = DevOpsTools.get_most_recent_deployment("NFTMarketplace", block.chainid);
        listingNftOnMarketplace(mostRecentDeployment);
    }

    function listingNftOnMarketplace (address _contractAddress) public {
        vm.startBroadcast(ownerNft);

        // Approve NFT to be listed
        IERC721(NFT_ADDRESS).approve(_contractAddress, TOKEN_ID);

        // List NFT on Marketplace
        NFTMarketplace(_contractAddress).listNft(NFT_ADDRESS, TOKEN_ID, PRICE);
        vm.stopBroadcast();
    }
}

contract PurchaseNft is Script {
    function run() external {
        address mostRecentDeployment = DevOpsTools.get_most_recent_deployment("NFTMarketplace", block.chainid);
        purchaseNftOnMarketplace(mostRecentDeployment);
    }

    function purchaseNftOnMarketplace (address _contractAddress) public {
        vm.startBroadcast();
        NFTMarketplace(_contractAddress).purchaseNft(NFT_ADDRESS, TOKEN_ID);
        vm.stopBroadcast();
    }
}

contract CancelListingNft is Script {
    function run() external {
        address mostRecentDeployment = DevOpsTools.get_most_recent_deployment("NFTMarketplace", block.chainid);
        cancelListingNftOnMarketplace(mostRecentDeployment);
    }

    function cancelListingNftOnMarketplace (address _contractAddress) public {
        vm.startBroadcast();
        NFTMarketplace(_contractAddress).cancelListingNft(NFT_ADDRESS, TOKEN_ID);
        vm.stopBroadcast();
    }
}

contract GetListOfNft is Script {
    function run() external {
        address mostRecentDeployment = DevOpsTools.get_most_recent_deployment("NFTMarketplace", block.chainid);
        getListOfNftOnMarketplace(mostRecentDeployment);
    }

    function getListOfNftOnMarketplace (address _contractAddress) public {
        vm.startBroadcast();
        NFTMarketplace(_contractAddress).getListingNft(NFT_ADDRESS, TOKEN_ID);
        vm.stopBroadcast();
    }
}