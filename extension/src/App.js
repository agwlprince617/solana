import React, { useState, useEffect } from 'react';
import Wallet from './services/Wallet';
import TransactionHistory from './components/TransactionHistory';
import WalletInfo from './components/WalletInfo';
import SendTransaction from './components/SendTransaction';
import './App.css';

const App = () => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    if (address) {
      fetchBalance();
    }
  }, [address]);

  const createWallet = () => {
    const wallet = Wallet.create();
    setAddress(wallet.address);
    fetchBalance();
  };

  const fetchBalance = async () => {
    const balance = await Wallet.getBalance(address);
    setBalance(balance);
  };

  const handleSendTransaction = async (recipient, amount) => {
    const txHash = await Wallet.sendTransaction(address, recipient, amount);
    setTransactionHistory([...transactionHistory, txHash]);
  };

  return (
    <div className="App">
      <h1>Solana Wallet</h1>
      {address ? (
        <>
          <WalletInfo address={address} balance={balance} />
          <SendTransaction onSendTransaction={handleSendTransaction} />
          <TransactionHistory transactions={transactionHistory} />
        </>
      ) : (
        <button onClick={createWallet}>Create Wallet</button>
      )}
    </div>
  );
};

export default App;
