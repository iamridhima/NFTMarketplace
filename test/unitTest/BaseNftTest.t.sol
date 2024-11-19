// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {BaseNft} from "src/BaseNft.sol";
import {DeployBaseNft} from "script/DeployBaseNft.s.sol";

contract BaseNftTest is Test {
    BaseNft baseNft;
    DeployBaseNft deployer;
    address public USER = makeAddr("USER");
    string public constant CLM = "ipfs://QmZxjP6aEEaPWDPcq3fhcETPR3a26f7MBKTNqdk1CD9M5J/01-CLM-Metadata.json";

    function setUp() public {
        deployer = new DeployBaseNft();
        baseNft = deployer.run();
    }

    function testNameAndSymbolIsCorrect() public view {
        // Arrange
        string memory expectedName = "CuteLilMonster";
        string memory expectedSymbol = "CLM";

        // Act
        string memory actualName = baseNft.name();
        string memory actualSymbol = baseNft.symbol();

        // Assert
        assert(keccak256(abi.encodePacked(expectedName)) == keccak256(abi.encodePacked(actualName)));
        assert(keccak256(abi.encodePacked(expectedSymbol)) == keccak256(abi.encodePacked(actualSymbol)));
    }

    function testMintNftAndHaveBalance() public {
        // Arrange
        vm.prank(USER);

        // Act
        baseNft.mintNft(CLM);

        // Assert
        assert(baseNft.balanceOf(USER) == 1);
        assert(keccak256(abi.encodePacked(CLM)) == keccak256(abi.encodePacked(baseNft.tokenURI(0))));
    }

    function testCounterIsIncremented() public {
        // Arrange
        uint256 inisialCounter = 0;
        uint256 expectedInisialCounter = baseNft.getCounterToken();
        uint256 endingCounter = 1;
        
        // Act
        vm.prank(USER);
        baseNft.mintNft(CLM);
        uint256 expectedEndingCounter = baseNft.getCounterToken();

        // Assert
        assertEq(inisialCounter, expectedInisialCounter);
        assertEq(endingCounter, expectedEndingCounter);
    }
}