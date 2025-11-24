// TransactionHistory.js

// Array to store all transactions
let transactions = [];

/*
  Transaction format:
  {
    id: number,
    type: "transfer" | "airtime",
    amount: number,
    date: string (ISO),
    details: string,  // e.g. "Airtime - MTN", "Transfer to GTBank"
  }
*/

// Add new transaction
export const addTransaction = (type, amount, details) => {
  const newRecord = {
    id: Date.now(),
    type,
    amount,
    date: new Date().toISOString(),
    details,
  };

  transactions.unshift(newRecord); // add newest at top

  return newRecord;
};

// Get full transaction history
export const getTransactions = () => transactions;
