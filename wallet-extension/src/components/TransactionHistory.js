import React from 'react';
import TransactionTile from './TransactionTile';

const TransactionHistory = ({ transactions }) => {
  return (
    <div>
      <h3>Transaction History</h3>
      
        {transactions.map((tx, index) => (
          <TransactionTile tx={tx} key={tx.signature}/>
        ))}
      
    </div>
  );
};

export default TransactionHistory;
