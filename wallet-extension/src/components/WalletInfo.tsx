import React, { FC } from 'react';

type WaletType = {
  address: string|null,
  balance: number|null,
};

interface WalletProps {
  wallet: WaletType,
}

const WalletInfo: FC<WaletType> = ({ address, balance }) => {
  return (
    <div>
      <h3>Wallet Info</h3>
      <p>Address: {address}</p>
      <p>Balance: {balance} SOL</p>
    </div>
  );
};

export default WalletInfo;
