import React, { createContext, useEffect, useState } from "react";

import { api } from "../services/api";

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transactionInput: ITransactionInput) => Promise<void>;
}

interface ITransaction {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string,
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;
// type TransactionInput = Pick<ITransaction, 'title' | 'amount' | 'type' | 'category'>; // - Another option

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => {
        setTransactions(response.data.transactions)
      });
  }, []);

  async function createTransaction(transactionInput: ITransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}