import React, { useState, useEffect } from 'react';
import { useWallet } from './services/Wallet';
import TransactionHistory from './components/TransactionHistory';
import WalletInfo from './components/WalletInfo';
import SendTransaction from './components/SendTransaction';
import './App.css';

const App = () => {
  const { address, getBalance, sendTransaction, createWallet } = useWallet();
  const [balance, setBalance] = useState<number|null>(0);
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]);

  useEffect(() => {
    // let add = localStorage.getItem('public-key')
    if (address) {
      fetchBalance();
    }
  }, [address]);

  const fetchBalance = async () => {
    const balance = await getBalance();
    setBalance(balance);
  };

  const handleSendTransaction = async (recipient:string, amount:string) => {
    const txHash = await sendTransaction(recipient, amount);
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
