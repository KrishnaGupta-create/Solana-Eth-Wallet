# Solana-Eth-Wallet
Built as a learning project for exploring Web3 wallet architecture using React, Express, Solana, and Ethereum.


 ## Features:
* Generate 12-word recovery phrases
* Import existing wallets using mnemonic phrases
* Derive public/private keys
* Fetch Solana & Ethereum balances
* Show/Hide sensitive information
* Copy wallet details to clipboard
* REST API based architecture
* No database required


## Architecture:
![image alt](https://github.com/KrishnaGupta-create/Solana-Eth-Wallet/blob/352872313217555862a60ce5bd85aa3be8d46a5b/wallet_app_architecture.svg)

## Install Dependencies:
```bash
npm install tweetnacl bip39 ed25519-hd-key @solana/web3.js sonner lucide-react
```
## How It Works

1. **Wallet Generation**
   - The application generates a secure 12-word mnemonic phrase using the BIP-39 standard.
   - A seed is derived from the mnemonic phrase.
   - Public and private keys are generated from the derived seed.

2. **Wallet Import**
   - Users can enter an existing recovery phrase to restore their wallet.
   - The application derives the same public and private keys from the provided mnemonic.

3. **Balance Fetching**
   - The backend connects to Solana and Ethereum RPC nodes.
   - Wallet balances are fetched in real-time and displayed in the UI.

4. **Security Features**
   - Recovery phrases and private keys can be hidden or revealed using toggle buttons.
   - Sensitive information can be copied securely to the clipboard.

5. **Frontend & Backend Communication**
   - The React frontend communicates with the Express backend through REST APIs.
   - The backend handles wallet derivation and blockchain interactions.


     
