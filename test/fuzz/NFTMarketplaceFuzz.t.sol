// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {NFTMarketplace} from "src/NFTMarketplace.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {DeployNftMarketplace} from "script/DeployNftMarketplace.s.sol"; // Import deploy script

contract MockNFT is ERC721 {
    constructor() ERC721("MockNFT", "MNFT") {}

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}

contract NFTMarketplaceFuzzTest is Test {
    NFTMarketplace marketplace;
    MockNFT mockNFT;
    address owner;
    address user;
    address notOwner;

    function setUp() public {
        // Generate random addresses using makeAddr
        owner = makeAddr("owner");
        user = makeAddr("user");
        notOwner = makeAddr("notOwner");

        // Deploy the NFT marketplace using the deploy script
        DeployNftMarketplace deployScript = new DeployNftMarketplace();
        marketplace = deployScript.run(); // Use the run function from the deploy script to deploy the contract

        // Deploy the MockNFT contract
        mockNFT = new MockNFT();

        // Mint an NFT to the owner
        vm.prank(owner);
        mockNFT.mint(owner, 1);
    }

    // Test case for listing NFT by non-owner
    function testFuzz_listNft_notOwner(address nonOwner, uint256 price) public {
        vm.assume(nonOwner != owner); // Pastikan `nonOwner` bukan pemilik NFT
        price = bound(price, 1, 1e18); // Valid range for price

        // Expect revert if non-owner tries to list an NFT
        vm.prank(nonOwner);
        vm.expectRevert(
            abi.encodeWithSelector(NFTMarketplace.NFTMarketplace__NotOwner.selector, address(mockNFT), 1, nonOwner)
        );
        marketplace.listNft(address(mockNFT), 1, price);
    }

    // Test case for invalid price (<= 0)
    function testFuzz_listNft_invalidPrice(uint256 price) public {
        price = bound(price, 0, 0); // Invalid price (<= 0)

        // Expect revert if the price is invalid (<= 0)
        vm.prank(owner);
        vm.expectRevert(NFTMarketplace.NFTMarketplace__PriceMustBeGreaterThanZero.selector);
        marketplace.listNft(address(mockNFT), 1, price);
    }
}
