import React, { createContext, useContext, useEffect, useState } from "react";

import { api } from "../services/api";

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transactionInput: ITransactionInput) => Promise<void>;
  summaryData: ISummary;
}

interface ISummary {
  total: number;
  deposit: number;
  withdraw: number;
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
  const [summaryData, setSummaryData] = useState<ISummary>({} as ISummary);

  useEffect(() => {
    api.get('transactions')
      .then(response => {
        setTransactions(response.data.transactions)
      });
  }, []);

  useEffect(() => {
    const summary = transactions.reduce((summary, transaction) => {
      if (transaction.type === 'deposit') {
        summary.total += transaction.amount;
        summary.deposit += transaction.amount;
      } else {
        summary.total -= transaction.amount;
        summary.withdraw -= transaction.amount;
      }

      return summary;
    }, {
      total: 0,
      deposit: 0,
      withdraw: 0,
    });

    setSummaryData(summary);
  }, [transactions]);

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
      summaryData,
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw Error('useTransactions must be inside a TransactionsProvider');
  }

  return context;
}