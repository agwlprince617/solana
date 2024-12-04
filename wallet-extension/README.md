# Solana Wallet Chrome Extension

## Description

The **Solana Wallet Chrome Extension** is a lightweight and user-friendly browser extension that allows users to manage their Solana (SOL) cryptocurrency directly from their Chrome browser. With this extension, users can create a new wallet, send and receive SOL tokens, and view their transaction history, all within a clean and intuitive user interface.

## Features

- **Create New Wallet**: Generate a new Solana wallet with a unique keypair. The wallet's public and private keys are securely stored using the browser's `localStorage`.
  
- **Persistent Wallet**: The wallet information is stored persistently, meaning users can reload the browser or return at any time without losing their wallet data.

- **Send SOL Tokens**: Easily send SOL tokens to any recipient address on the Solana network. The extension supports specifying a fee-payer and allows transactions with unfunded recipients.

- **Receive SOL Tokens**: Share your public address with others to receive SOL tokens. The extension automatically updates the balance as transactions are confirmed.

- **View Transaction History**: Access a complete history of all transactions associated with your wallet, including details like transaction amount, sender, receiver, and transaction status.

- **Connect to Devnet**: The extension is configured to work with the Solana Devnet by default, making it ideal for development and testing purposes.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/solana-wallet-extension.git
    ```
2. Navigate to the project directory:
    ```bash
    cd solana-extension
    cd wallet-extension
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Build the project:
    ```bash
    npm run build
    ```
5. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click on "Load unpacked" and select the `dist` directory from the project.

## Usage

- Once installed, click on the Solana Wallet icon in the Chrome toolbar to open the extension.
- If you don’t have a wallet, create one by clicking the "Create Wallet" button.
- Use the provided address to receive SOL tokens, or send SOL tokens to another address.
- View your transaction history directly in the extension.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.


