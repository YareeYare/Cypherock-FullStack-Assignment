# Cypherock Wallet Manager

Cypherock Wallet Manager is a web application that allows users to manage Bitcoin testnet wallets. Users can import wallets, view their balance and transactions, delete wallets, and resync their data. The project is built with TypeScript, ReactJS, and Redux Toolkit.

## Live Demo

Explore the live demo of the [cySync](https://web3-cysync-mehuls-projects-698f807d.vercel.app/)

## Features

- **Import Wallet**: Users can import wallets using a mnemonic phrase. The application ensures that duplicate wallets are not imported.
- **View Wallets**: Users can view a list of their imported wallets along with their balances.
- **View Transactions**: Users can view the transactions associated with each wallet.
- **Delete Wallet**: Users can delete wallets from their list.
- **Resync Data**: Users can resync their wallet data, including balance and transactions.

## Technologies Used

- **BitcoinJS**
- **TypeScript**
- **ReactJS**
- **Redux Toolkit**
- **Styled Components**
- **Axios**

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1.22 or higher)

### Installation

1. Clone the repository to your local machine using `git clone` , or Download the source code as a ZIP file.

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your BlockCypher API key:

    ```bash
    VITE_BLOCKCYPHER_API_KEY=your_api_key_here
    ```
    You can get it from [BlockCypher](https://www.blockcypher.com/)

### Running the Application

To start the development server, run:

```bash
npm run dev
```

## Usage

### Importing a Wallet

1.  Click on the "Import Wallet" button.
2.  Enter the wallet name and mnemonic phrase.
3.  Click "Import".

### Viewing Wallets

- The list of imported wallets is displayed on the main page.
- Each wallet shows its coin and balance.

### Viewing Transactions

- Click on a Transactions to view all transactions.
- Transactions include the wallet name, total amount, and confirmed time.

### Deleting a Wallet

- Click the delete button next to the wallet you want to remove.

### Resyncing Data

- Click the "Resync" button to refresh the balance and transactions for all wallets.

## Code Overview

### `store/walletSlice.ts`

This file contains the Redux slice for managing wallets. It includes actions and async thunks for importing wallets, fetching balances, fetching transactions, processing the sync queue, and deleting wallets.

### `components/Header.tsx`

The header component displays the application logo and the sync status. It also includes a button to resync wallet data.

### `pages/Wallets.tsx`

This page displays the list of wallets. Each wallet includes a delete button to remove the wallet from the list.

### `pages/Transactions.tsx`

This page displays the list of transactions. Each transaction includes the wallet name, total amount, and confirmed time.

## Additional Features

- **Deleting a Wallet**: Users can delete a wallet by clicking the delete button next to it.
- **Preventing Duplicate Imports**: The application checks if a wallet with the same mnemonic already exists before importing.
