import React, { useState, useEffect } from 'react';
import { useWallet } from './services/Wallet';
import TransactionHistory from './components/TransactionHistory';
import WalletInfo from './components/WalletInfo';
import SendTransaction from './components/SendTransaction';
import './App.css';

const App = () => {
  const { address, getBalance, sendTransaction, createWallet,getTransactionHistory } = useWallet();
  const [balance, setBalance] = useState<number|null>(0);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  useEffect(() => {
    // let add = localStorage.getItem('public-key')
    if (address) {
      fetchBalance();
      handleHistory()
    }
  }, [address,balance]);

  const fetchBalance = async () => {
    const balance = await getBalance();
    setBalance(balance);
  };

  const handleSendTransaction = async (recipient:string, amount:string) => {
    const txHash = await sendTransaction(recipient, amount);
    handleHistory()
    fetchBalance()
    // setTransactionHistory([...transactionHistory, txHash]);
    // setTransactionHistory()
  };

  const handleHistory = async()=>{
    let transactions = await getTransactionHistory()
    setTransactionHistory(transactions)
    console.log(transactions);
  }

  return (
    <div className="App">
      <h1>Solana Wallet</h1>
      {address ? (
        <>
          <WalletInfo address={address} balance={balance} />
          <button onClick={()=>fetchBalance()}>Refresh</button>
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
