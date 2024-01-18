import { FC, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa';
import { IResponseTransactionLoader } from '../../types/types';
import CategoryModal from '../CategoryModal/CategoryModal';

const TransactionForm: FC = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const { categories } = useLoaderData() as IResponseTransactionLoader;

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" method="post" action="/transactions">
        <label className="grid" htmlFor="title">
          <span>Название транзакции</span>
          <input
            type="text"
            className="input border-slate-600"
            placeholder="Название..."
            name="title"
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Сумма</span>
          <input
            type="number"
            className="input border-slate-600"
            placeholder="Сумма..."
            name="amount"
            required
          />
        </label>

        {categories.length ? (
          <label htmlFor="category" className="grid">
            <span>Категории</span>
            <select name="category" required className="input border-slate-700">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h2 className="mt-1 text-red-300">Для начала создайте категорию</h2>
        )}

        <button
          onClick={() => setVisibleModal(true)}
          className="max-w-fit flex items-center gap-2 text-white/50  hover:text-white">
          <FaPlus />
          <span>Создать новую категорию</span>
        </button>

        <div className="flex gap-4 items-center">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="radio" name="type" value={'income'} className="form-radio text-blue-600" />
            <span>Доход</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'expense'}
              className="form-radio text-blue-600"
            />
            <span>Расход</span>
          </label>
        </div>

        <button className="btn btn-green max-w-fit mt-2">Выполнить</button>
      </Form>

      {visibleModal && <CategoryModal type="post" setVisibleModal={setVisibleModal} />}
    </div>
  );
};
export default TransactionForm;
