// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ReentrancyGuard, Ownable {
    /*///////////////////////////////////////////////////////////////
                                Errors
    //////////////////////////////////////////////////////////////*/
    error NFTMarketplace__NotOwner(address nftAddress, uint256 tokenId, address spender);
    error NFTMarketplace__NftNotListed(address nftAddress, uint256 tokenId);
    error NFTMarketplace__NftAlreadyListed(address nftAddress, uint256 tokenId);
    error NFTMarketplace__PriceMustBeGreaterThanZero();
    error NFTMarketplace__NotApproved();
    error NFTMarketplace__InsufficientOrExcessFundsToBuyNFT();
    error NFTMarketplace__PurchaseFailed();

    /*///////////////////////////////////////////////////////////////
                            Type Declarations
    //////////////////////////////////////////////////////////////*/
    struct Listing {
        uint256 price;
        address seller;
        bool isListed;
    }

    /*///////////////////////////////////////////////////////////////
                            State Variables
    //////////////////////////////////////////////////////////////*/
    // Mapping NFT address => token ID => Listing
    mapping(address => mapping(uint256 => Listing)) private s_listings;

    /*///////////////////////////////////////////////////////////////
                                Events
    //////////////////////////////////////////////////////////////*/
    event NFTListed(address indexed nftAddress, uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTSold(address indexed nftAddress, uint256 indexed tokenId, address indexed buyer, uint256 price);
    event NFTCancelled(address indexed nftAddress, uint256 indexed tokenId, address indexed seller);

    /*///////////////////////////////////////////////////////////////
                                Modifiers
    //////////////////////////////////////////////////////////////*/
    modifier isOwner(address nftAddress, uint256 tokenId, address spender) {
        IERC721 nft = IERC721(nftAddress);
        if (nft.ownerOf(tokenId) != spender) {
            revert NFTMarketplace__NotOwner(nftAddress, tokenId, spender);
        }
        _;
    }

    modifier NftisListed(address nftAddress, uint256 tokenId) {
        if (s_listings[nftAddress][tokenId].isListed == false) {
            revert NFTMarketplace__NftNotListed(nftAddress, tokenId);
        }
        _;
    }

    modifier NftnotListed(address nftAddress, uint256 tokenId) {
        if (s_listings[nftAddress][tokenId].isListed == true) {
            revert NFTMarketplace__NftAlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    /*///////////////////////////////////////////////////////////////
                                Constructor
    //////////////////////////////////////////////////////////////*/
    constructor() Ownable(msg.sender) {}

    /*///////////////////////////////////////////////////////////////
                                Functions
    //////////////////////////////////////////////////////////////*/
    /**
     * @dev function to list an NFT for sale on the marketplace
     * @notice isOwner and isListed modifiers are used to validate the NFT
     * @param nftAddress The address of the NFT contract to list
     * @param tokenId The ID of the NFT to list
     */
    function listNft(address nftAddress, uint256 tokenId, uint256 price)
        external
        isOwner(nftAddress, tokenId, msg.sender)
        NftnotListed(nftAddress, tokenId)
    {
        // Validate price
        if (price <= 0) {
            revert NFTMarketplace__PriceMustBeGreaterThanZero();
        }

        // Approve the marketplace to transfer the NFT
        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) {
            revert NFTMarketplace__NotApproved();
        }

        // Mapping NFT address => token ID => Listing
        s_listings[nftAddress][tokenId] = Listing(price, msg.sender, true);
        emit NFTListed(nftAddress, tokenId, msg.sender, price);
    }

    /**
     * @dev function to buy an NFT from the marketplace, nft must be listed first with listNft function
     * @notice isListed modifiers are used to validate the NFT is listed
     * @param nftAddress The address of the NFT contract we are buying
     * @param tokenId The ID of the NFT we are buying
     */
    function purchaseNft(address nftAddress, uint256 tokenId)
        external
        payable
        nonReentrant
        NftisListed(nftAddress, tokenId)
    {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (msg.value != listing.price) {
            revert NFTMarketplace__InsufficientOrExcessFundsToBuyNFT();
        }

        // Transfer the NFT to the buyer
        IERC721(nftAddress).safeTransferFrom(listing.seller, msg.sender, tokenId);

        // Transfer the funds to the seller
        (bool success,) = payable(listing.seller).call{value: msg.value}("");
        if (!success) {
            revert NFTMarketplace__PurchaseFailed();
        }

        // Remove the listing
        delete s_listings[nftAddress][tokenId];

        // Emit event
        emit NFTSold(nftAddress, tokenId, msg.sender, listing.price);
    }

    /**
     * @dev function to cancel a listing of an listed NFT on the marketplace
     * @notice isOwner and isListed modifiers are used to validate the NFT
     * @notice Only cancel NFT that are listed on the marketplace and can't cancel NFT that are not listed
     * @param nftAddress The address of the NFT contract to cancel the listing
     * @param tokenId The ID of the NFT to cancel the listing
     */
    function cancelListingNft(address nftAddress, uint256 tokenId)
        external
        nonReentrant
        isOwner(nftAddress, tokenId, msg.sender)
        NftisListed(nftAddress, tokenId)
    {
        // Remove the listing
        delete s_listings[nftAddress][tokenId];

        // Emit event
        emit NFTCancelled(nftAddress, tokenId, msg.sender);
    }

    /*///////////////////////////////////////////////////////////////
                            Getter Functions
    //////////////////////////////////////////////////////////////*/
    function getListingNft(address nftAddress, uint256 tokenId)
        external
        view
        NftisListed(nftAddress, tokenId)
        returns (Listing memory)
    {
        return s_listings[nftAddress][tokenId];
    }
}
