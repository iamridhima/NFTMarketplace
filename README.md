# NFT Marketplace Contract

This is a simple NFT Marketplace contract where you can list your NFT in marketplace, and then people can buy it with designated price. Created using `Foundry` framework.

This contract not included a royalty feature to the marketplace, further development can be done for this feature.

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

# Getting Started

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [foundry](https://getfoundry.sh/)
  - You'll know you did it right if you can run `forge --version` and you see a response like `forge 0.2.0 (816e00b 2023-03-16T00:05:26.396218Z)`

## Quickstart

```
git clone https://github.com/KrisAdw/Simple-NFTMarketplace.git
cd Simple-NFTMarketplace
forge build
```

# Usage

## Start a local node

```
make anvil
```

## Deploy

This will default to your local node. You need to have it running in another terminal in order for it to deploy.

### Deploy NFT
```
make deployNft
```

### Deploy Marketplace
```
make deployMarketplace
```
Other usage command can be find in Makefile 

## Testing

```
forge test
```

or

```
forge test --fork-url $SEPOLIA_RPC_URL
```

### Test Coverage

```
forge coverage
```

## Estimate gas

You can estimate how much gas things cost by running:

```
forge snapshot
```

And you'll see an output file called `.gas-snapshot`

# Formatting

To run code formatting:

```
forge fmt
```


# Thank you!
If you want to get contact on me, feel free to connect or follow me on:
<br><br>
[![Kris Adiwinata Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kris-adiwinata-726379214/)
[![Kris Adiwinata Instagram](https://img.shields.io/badge/Instagram-FD1D1D?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/kris.adw/)
[![Kris Adiwinata Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/regis_1269)