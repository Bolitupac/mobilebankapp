interface Transaction {
  id: number;
  type: string;
  details: any;
  date: string;
}

let transactions: Transaction[] = [];

export const addTransaction = (type: string, details: any) => {
  const newTransaction: Transaction = {
    id: Date.now(),
    type,
    details,
    date: new Date().toISOString(),
  };

  transactions.unshift(newTransaction);
};

export const getTransactions = (): Transaction[] => {
  return transactions;
};

export const clearTransactions = () => {
  transactions = [];
};
