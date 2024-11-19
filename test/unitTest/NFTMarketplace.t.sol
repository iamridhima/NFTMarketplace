// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {NFTMarketplace} from "src/NFTMarketplace.sol";
import {DeployNftMarketplace} from "script/DeployNftMarketplace.s.sol";
import {BaseNft} from "src/BaseNft.sol";
import {DeployBaseNft} from "script/DeployBaseNft.s.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplaceTest is Test {
    NFTMarketplace nftMarketplace;
    BaseNft baseNft;
    DeployBaseNft deployerBaseNft;
    DeployNftMarketplace deployer;
    address private ownerNft = makeAddr("ownerNft");
    address private buyer = makeAddr("buyer");
    uint256 private tokenId;
    uint256 private price = 1e18;
    string constant CLM = "ipfs://QmZxjP6aEEaPWDPcq3fhcETPR3a26f7MBKTNqdk1CD9M5J/01-CLM-Metadata.json";

    function setUp() public {
        // Deploy contract
        deployerBaseNft = new DeployBaseNft();
        baseNft = deployerBaseNft.run();
        deployer = new DeployNftMarketplace();
        nftMarketplace = deployer.run();

        vm.deal(ownerNft, 10 ether); // Memberikan ether ke ownerNft
        vm.deal(buyer, 10 ether); // Memberikan ether ke buyer
    }

    /////////////////////////////////////////
    // Modifier
    /////////////////////////////////////////
    modifier mintNft(address nftAddress) {
        vm.startPrank(ownerNft);
        baseNft.mintNft(CLM); // Mint Nft
        tokenId = baseNft.getCounterToken() - 1; // Get token id
        console.log("Minted Token ID: ", tokenId);
        vm.stopPrank();
        _;
    }

    modifier mintAndApproveNft(address nftAddress, uint256 _tokenId) {
        // Mint NFT
        vm.startPrank(ownerNft);
        baseNft.mintNft(CLM); // Mint Nft
        tokenId = baseNft.getCounterToken() - 1; // Get token id
        baseNft.approve(address(nftMarketplace), tokenId); // Approve NFT to be listed
        console.log("Minted and Approved Token ID: ", tokenId);
        vm.stopPrank();
        _;
    }

    modifier nftListed(address nftAddress, uint256 _tokenId) {
        // Mint NFT
        vm.startPrank(ownerNft);
        baseNft.mintNft(CLM); // Mint Nft
        tokenId = baseNft.getCounterToken() - 1; // Get token id
        baseNft.approve(address(nftMarketplace), tokenId); // Approve NFT to be listed
        nftMarketplace.listNft(address(baseNft), tokenId, price); // List NFT
        console.log("Minted, Approved, and Listed Token ID: ", tokenId);
        vm.stopPrank();
        _;
    }

    /////////////////////////////////////////
    // Listing NFT
    /////////////////////////////////////////
    function testListNft() public mintAndApproveNft(address(baseNft), tokenId) {
        // Arrange
        vm.prank(ownerNft);

        vm.expectEmit(true, true, true, true);
        emit NFTMarketplace.NFTListed(address(baseNft), tokenId, address(ownerNft), price);

        // Act
        nftMarketplace.listNft(address(baseNft), tokenId, price);

        // Assert
        // Get listing data
        NFTMarketplace.Listing memory listing = nftMarketplace.getListingNft(address(baseNft), tokenId);

        // Get data from listing
        uint256 listedPrice = listing.price;
        address listedSeller = listing.seller;
        bool isListed = listing.isListed;

        // Check if the data is correct
        assertEq(listedPrice, price);
        assertEq(listedSeller, address(ownerNft));
        assertTrue(isListed);
    }

    function testNFTListIsNotOwner() public mintAndApproveNft(address(baseNft), tokenId) {
        // Arrange
        address notOwner = makeAddr("notOwner");
        vm.deal(notOwner, 10 ether); // Give ether to the non-owner address

        vm.startPrank(notOwner); // Prank the user as a non-owner

        vm.expectRevert(
            abi.encodeWithSelector(
                NFTMarketplace.NFTMarketplace__NotOwner.selector,
                address(baseNft), // The address of the NFT contract
                tokenId, // The token ID trying to be listed
                notOwner // The non-owner address trying to list the NFT
            )
        );

        // Act: Try to list the NFT as a non-owner
        nftMarketplace.listNft(address(baseNft), tokenId, price);

        // Assert: Revert should happen
        vm.stopPrank();
    }

    function testNFTListIsAlreadyListed() public mintAndApproveNft(address(baseNft), tokenId) {
        // Arrange
        vm.startPrank(ownerNft); // Prank the owner address

        // Act: List the NFT
        nftMarketplace.listNft(address(baseNft), tokenId, price);

        // Assert: Try to list the NFT again
        vm.expectRevert(
            abi.encodeWithSelector(
                NFTMarketplace.NFTMarketplace__NftAlreadyListed.selector,
                address(baseNft), // The address of the NFT contract
                tokenId // The token ID trying to be listed
            )
        );
        nftMarketplace.listNft(address(baseNft), tokenId, price);
        vm.stopPrank();
    }

    function testNFTListPriceMustBeGreaterThanZero() public mintAndApproveNft(address(baseNft), tokenId) {
        // Arrange
        uint256 invalidPrice = 0;

        vm.startPrank(ownerNft); // Prank the owner address
        vm.expectRevert(abi.encodeWithSelector(NFTMarketplace.NFTMarketplace__PriceMustBeGreaterThanZero.selector));
        nftMarketplace.listNft(address(baseNft), tokenId, invalidPrice);
        vm.stopPrank();
    }

    function testNFTListRevertNotApproved() public mintNft(address(baseNft)) {
        // Arrange
        vm.startPrank(ownerNft); // Prank the owner address

        // Act: Try to list the NFT without approval
        vm.expectRevert(abi.encodeWithSelector(NFTMarketplace.NFTMarketplace__NotApproved.selector));
        nftMarketplace.listNft(address(baseNft), tokenId, price);
        vm.stopPrank();
    }

    /////////////////////////////////////////
    //  Purchase NFT
    /////////////////////////////////////////
    function testPurchaseNftSuccess() public nftListed(address(baseNft), tokenId) {
        // Arrange
        vm.startPrank(buyer); // Prank buyer address

        // Act: Expect emit event
        vm.expectEmit(true, true, true, true);
        emit NFTMarketplace.NFTSold(address(baseNft), tokenId, address(buyer), price);

        // Assert: Check emit event
        nftMarketplace.purchaseNft{value: price}(address(baseNft), tokenId); 
        
        vm.stopPrank();
    }

    function testPurchaseNftNotListed() public nftListed(address(baseNft), tokenId) {
        // Arrange
        uint256 invalidTokenId = tokenId + 1; // Invalid token ID
        vm.startPrank(buyer); // Prank the buyer address

        // Act: Try to buy the NFT that is not listed
        vm.expectRevert(
            abi.encodeWithSelector(
                NFTMarketplace.NFTMarketplace__NftNotListed.selector,
                address(baseNft), // The address of the NFT contract
                invalidTokenId // The token ID trying to be bought
            )
        );
        nftMarketplace.purchaseNft(address(baseNft), invalidTokenId);
        vm.stopPrank();
    }

    function testInsufficientFundsToPurchaseNft() public nftListed(address(baseNft), tokenId) {
        // Arrange
        uint256 invalidPrice = 1e17; // Invalid price
        vm.startPrank(buyer); // Prank the buyer address

        vm.expectRevert(
            abi.encodeWithSelector(NFTMarketplace.NFTMarketplace__InsufficientOrExcessFundsToBuyNFT.selector)
        );
        nftMarketplace.purchaseNft{value: invalidPrice}(address(baseNft), tokenId);
        vm.stopPrank();
    }

    /////////////////////////////////////////
    //  Cancel NFT
    /////////////////////////////////////////
    function testCancelNft() public nftListed(address(baseNft), tokenId) {
        // Arrange
        vm.startPrank(ownerNft); // Prank the owner address

        // Act: Expect emit event
        vm.expectEmit(true, true, true, true);
        emit NFTMarketplace.NFTCancelled(address(baseNft), tokenId, address(ownerNft));

        // Assert: Check emit event
        nftMarketplace.cancelListingNft(address(baseNft), tokenId);
        vm.stopPrank();
    }
}
