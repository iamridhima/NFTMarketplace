-include .env

build :; forge build

test :; forge test

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1


# Deploy Contracts (NFT)
deployNft : 
	@forge script script/DeployBaseNft.s.sol:DeployBaseNft --rpc-url ${ANVIL_LOCALHOST} --private-key ${ANVIL_KEY} --broadcast -vvvv

deployNft-sepolia :
	@forge script script/DeployBaseNft.s.sol:DeployBaseNft --rpc-url ${SEPOLIA_RPC_URL} --account sepoliaKey --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} -vvvv

# Deploy Contracts (Marketplace)
deployMarketplace :
	@forge script script/DeployNftMarketplace.s.sol:DeployNftMarketplace --rpc-url ${ANVIL_LOCALHOST} --private-key ${ANVIL_KEY} --broadcast -vvvv

deployMarketplace-sepolia :
	@forge script script/DeployNftMarketplace.s.sol:DeployNftMarketplace --rpc-url ${SEPOLIA_RPC_URL} --account sepoliaKey --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} -vvvv

# Mint NFT
mint :
	@forge script script/Interaction.s.sol:MintNft --rpc-url ${ANVIL_LOCALHOST} --private-key ${ANVIL_KEY} --broadcast -vvvv

mint-sepolia :
	@forge script script/Interaction.s.sol:MintNft --rpc-url ${SEPOLIA_RPC_URL} --account sepoliaKey --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} -vvvv

# Marketplace
listNft :
	@forge script script/Interaction.s.sol:ListNft --rpc-url ${ANVIL_LOCALHOST} --private-key ${ANVIL_KEY} --broadcast -vvvv

listNft-sepolia :
	@forge script script/Interaction.s.sol:ListNft --rpc-url ${SEPOLIA_RPC_URL} --account sepoliaKey --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} -vvvv

purchaseNft :
	@forge script script/Interaction.s.sol:PurchaseNft --rpc-url ${ANVIL_LOCALHOST} --private-key ${ANVIL_KEY} --broadcast -vvvv

purchaseNft-sepolia :
	@forge script script/Interaction.s.sol:PurchaseNft --rpc-url ${SEPOLIA_RPC_URL} --account sepoliaKey --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} -vvvv

cancelNft :
	@forge script script/Interaction.s.sol:CancelListingNft --rpc-url ${ANVIL_LOCALHOST} --private-key ${ANVIL_KEY} --broadcast -vvvv

cancelNft-sepolia :
	@forge script script/Interaction.s.sol:CancelListingNft --rpc-url ${SEPOLIA_RPC_URL} --account sepoliaKey --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY} -vvvv

nftList-sepolia :
	@forge script script/Interaction.s.sol:GetListOfNft --rpc-url ${SEPOLIA_RPC_URL} --account sepoliaKey -vvvv --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}