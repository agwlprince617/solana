import React, { useState } from 'react';

const SendTransaction = ({ onSendTransaction }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    onSendTransaction(recipient, amount);
    setRecipient('');
    setAmount('');
  };

  return (
    <div>
      <h3>Send Transaction</h3>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default SendTransaction;
