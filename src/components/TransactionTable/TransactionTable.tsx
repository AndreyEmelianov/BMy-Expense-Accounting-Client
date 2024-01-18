import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';

import { IResponseTransactionLoader } from '../../types/types';
import { formatDate } from '../../helpers/date.helper';
import { formatToRUB } from '../../helpers/currency.helper';

const TransactionTable: FC = () => {
  const { transactions } = useLoaderData() as IResponseTransactionLoader;

  return (
    <>
      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold"> № </td>
              <td className="font-bold">Название</td>
              <td className="font-bold">Сумма ₽</td>
              <td className="font-bold">Категория</td>
              <td className="font-bold">Дата</td>
              <td className="text-right">Действие</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.title}</td>
                <td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-400'}>
                  {transaction.type === 'income'
                    ? `+ ${formatToRUB.format(transaction.amount)}`
                    : `- ${formatToRUB.format(transaction.amount)}`}
                </td>
                <td>{transaction.category?.title || 'Другое'}</td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                  <Form method="delete" action="/transactions">
                    <input type="hidden" name="id" value={transaction.id} />
                    <button className="btn hover:btn-red ml-auto">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TransactionTable;
