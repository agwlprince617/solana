import React from 'react';

const TransactionHistory = ({ transactions }) => {
  return (
    <div>
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>{tx}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
