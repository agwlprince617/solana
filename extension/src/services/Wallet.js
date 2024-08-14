import { Connection, clusterApiUrl, Keypair, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

class Wallet {
  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'));
    this.keypair = Keypair.generate();
  }

  static create() {
    return new Wallet();
  }

  get address() {
    return this.keypair.publicKey.toBase58();
  }

  async getBalance() {
    const balance = await this.connection.getBalance(this.keypair.publicKey);
    return balance / LAMPORTS_PER_SOL;
  }

  async sendTransaction(toAddress, amount) {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: this.keypair.publicKey,
        toPubkey: new PublicKey(toAddress),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    const signature = await this.connection.sendTransaction(transaction, [this.keypair]);
    await this.connection.confirmTransaction(signature);
    return signature;
  }
}

export default Wallet;
