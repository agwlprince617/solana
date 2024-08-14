import React from 'react'

function TransactionTile({tx}) {
  return (
    <div className='tran-container'>
        <div className='info'>
            <span>From</span>
            <p>{tx.from}</p>
        </div>
        <div className='info'>
            <span>To</span>
            <p>{tx.to}</p>
        </div>
        <div className='info'>
            <span>Amount</span>
            <p>{tx.amount}</p>
        </div>
    </div>
  )
}

export default TransactionTile