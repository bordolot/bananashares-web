# 1. Start Anvil in repo with bananashares smart contracts.
```bash
anvil --port 8546 
```
# 2. Run code and read output.
```bash
forge script script/SongsMarketplaceAnvil.s.sol:SongsMarketplaceScript --rpc-url http://127.0.0.1:8546 --broadcast
forge script script/ForTests.s.sol:ForTestsScript --rpc-url http://127.0.0.1:8546 --broadcast
```
Search for "SongsMarketplace address".
Confirm that AssetFactory value from bananashares-web/src/blockchain/contracts/addresses.json
equals "SongsMarketplace address".

