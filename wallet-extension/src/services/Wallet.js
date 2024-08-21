import { useState, useEffect } from 'react';
import { Connection, clusterApiUrl, Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL,sendAndConfirmTransaction  } from '@solana/web3.js';
import { Buffer } from 'buffer'; // Import the Buffer polyfill

window.Buffer = Buffer; 

export const useWallet = () => {
  const [connection] = useState(new Connection(clusterApiUrl('devnet')));
  const [keypair, setKeypair] = useState(() => {
    const storedKeypair = localStorage.getItem('solana_keypair');
    if (storedKeypair) {
      const { secretKey } = JSON.parse(storedKeypair);
      return Keypair.fromSecretKey(Uint8Array.from(secretKey));
    }
    return null;
  });

  const address = keypair ? keypair.publicKey.toBase58() : null;

  const getBalance = async () => {
    if (keypair) {
      console.log("in get balance");
      const balance = await connection.getBalance(keypair.publicKey);
      return balance / LAMPORTS_PER_SOL;
    }
    return null;
  };

  const sendTransaction = async (toAddress, amount) => {
    if (!keypair) throw new Error('No wallet connected');
    console.log("wallet connected!");
    console.log("to",new PublicKey(toAddress));
    console.log("amount:",amount);
    console.log("from",keypair.publicKey);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: new PublicKey(toAddress),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    console.log(transaction);

    const signature = await sendAndConfirmTransaction(connection,transaction, [keypair]);
    // await connection.confirmTransaction(signature);
    return signature;
  };

  const createWallet = () => {
    const newKeypair = Keypair.generate();
    setKeypair(newKeypair);
    localStorage.setItem(
      'solana_keypair',
      JSON.stringify({
        publicKey: newKeypair.publicKey.toBase58(),
        secretKey: Array.from(newKeypair.secretKey),
      })
    );
    return newKeypair.publicKey.toBase58();
  };

  const getTransactionHistory = async () => {
    if (!keypair) throw new Error('No wallet connected');

    const signatures = await connection.getSignaturesForAddress(
      keypair.publicKey
    );
    console.log(signatures);

    const transactions = await Promise.all(
      signatures.map(async ({ signature }) => {
        const tx = await connection.getTransaction(signature);
        console.log(tx);
        return tx;
      })
    );
    console.log(transactions);

    return transactions.map((tx) => {
      const { meta, transaction } = tx;
      const { preBalances, postBalances,fee } = meta;
      const amount = (preBalances[0] - postBalances[0]-fee) / LAMPORTS_PER_SOL;
      const toAddress = transaction.message.accountKeys[1].toBase58();
      const fromAddress = transaction.message.accountKeys[0].toBase58();

      return {
        signature: tx.transaction.signatures[0],
        from: fromAddress,
        to: toAddress,
        amount,
        status: meta.err ? 'Failed' : 'Success',
      };
    });
  };

  useEffect(() => {
    if (keypair) {
      localStorage.setItem(
        'solana_keypair',
        JSON.stringify({
          publicKey: keypair.publicKey.toBase58(),
          secretKey: Array.from(keypair.secretKey),
        })
      );
    }
  }, [keypair]);

  return {
    address,
    getBalance,
    sendTransaction,
    createWallet,
    getTransactionHistory
  };
};
