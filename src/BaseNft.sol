// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BaseNft is ERC721 {
    uint256 private s_tokenCounter;
    mapping(uint256 tokenId => string tokenURI) private s_tokenIdToURI;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        s_tokenCounter = 0;
    }

    function mintNft(string memory _tokenURI) public {
        s_tokenIdToURI[s_tokenCounter] = _tokenURI;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return s_tokenIdToURI[_tokenId];
    }

    function getCounterToken() public view returns (uint256) {
        return s_tokenCounter;
    }
}
