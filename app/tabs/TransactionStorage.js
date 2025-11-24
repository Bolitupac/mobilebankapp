// TransactionStorage.js
let transactions = [];

export const addTransaction = (type, details) => {
  const newTransaction = {
    id: Date.now(),
    type,              // "airtime" or "transfer"
    details,           // extra info (phone, amount, bank, etc)
    date: new Date().toISOString(),
  };

  transactions.unshift(newTransaction);  // newest first
};

export const getTransactions = () => {
  return transactions;
};
