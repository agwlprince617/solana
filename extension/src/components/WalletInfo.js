import React from 'react';

const WalletInfo = ({ address, balance }) => {
  return (
    <div>
      <h3>Wallet Info</h3>
      <p>Address: {address}</p>
      <p>Balance: {balance} SOL</p>
    </div>
  );
};

export default WalletInfo;
