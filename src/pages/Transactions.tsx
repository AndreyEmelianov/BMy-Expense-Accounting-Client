import { FC } from 'react';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';

import Chart from '../components/Chart/Chart';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import TransactionTable from '../components/TransactionTable/TransactionTable';
import { axiosInstance } from '../api/axios.api';
import { ICategory, IResponseTransactionLoader, ITransaction } from '../types/types';
import { formatToRUB } from '../helpers/currency.helper';

export const transactionLoader = async () => {
  const categories = await axiosInstance.get<ICategory[]>('/categories');
  const transactions = await axiosInstance.get<ITransaction[]>('/transactions');
  const totalIncome = await axiosInstance.get<number>('/transactions/income/find');
  const totalExpense = await axiosInstance.get<number>('/transactions/expense/find');

  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  };
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transactionAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const newTransaction = {
        title: formData.get('title'),
        amount: +formData.get('amount'),
        category: formData.get('category'),
        type: formData.get('type'),
      };

      await axiosInstance.post('/transactions', newTransaction);
      toast.success('Транзакция добавлена');
      return null;
    }

    case 'DELETE': {
      const formData = await request.formData();
      const transactionId = formData.get('id');
      await axiosInstance.delete(`/transactions/transaction/${transactionId}`);
      toast.success('Транзакция удалена');
      return null;
    }

    default:
      return null;
  }
};

const Transactions: FC = () => {
  const { totalExpense, totalIncome } = useLoaderData() as IResponseTransactionLoader;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        <div className="grid col-span-2">
          <TransactionForm />
        </div>

        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md font-bold text-center">Общий доход</p>
              <p className="bg-green-600 p-1 rounded-sm mt-2 text-center">
                {formatToRUB.format(totalIncome)}
              </p>
            </div>
            <div>
              <p className="uppercase text-md font-bold text-center">Общий расход</p>
              <p className="bg-red-500 p-1 rounded-sm mt-2 text-center">
                {formatToRUB.format(totalExpense)}
              </p>
            </div>
          </div>

          <>
            <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
          </>
        </div>
      </div>

      <h1 className="my-5">
        <TransactionTable limit={5} />
      </h1>
    </>
  );
};
export default Transactions;
