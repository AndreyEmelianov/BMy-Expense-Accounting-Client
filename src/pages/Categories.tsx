import { FC, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';

import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import CategoryModal from '../components/CategoryModal/CategoryModal';
import { axiosInstance } from '../api/axios.api';
import { ICategory } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const title = {
        title: formData.get('title'),
      };

      await axiosInstance.post('/categories', title);
      return null;
    }

    case 'PATCH': {
      const formData = await request.formData();
      const category = {
        id: formData.get('id'),
        title: formData.get('title'),
      };
      await axiosInstance.patch(`/categories/category/${category.id}`, category);
      return null;
    }

    case 'DELETE': {
      const formData = await request.formData();
      const categoryId = formData.get('id');
      await axiosInstance.delete(`/categories/category/${categoryId}`);
      return null;
    }
    default:
      break;
  }
};

export const categoryLoader = async () => {
  const { data } = await axiosInstance.get<ICategory[]>('/categories');
  return data;
};

const Categories: FC = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const categories = useLoaderData() as ICategory[];

  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>Список ваших категорий :</h1>
        <div className="flex mt-2 items-center gap-2 flex-wrap">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
              {category.title}
              <div className="hidden absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                <button
                  onClick={() => {
                    setCategoryId(category.id);
                    setVisibleModal(true);
                    setIsEdit(true);
                  }}>
                  <AiFillEdit />
                </button>

                <Form className="flex" method="delete" action="/categories">
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setVisibleModal(true)}
          className="max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white">
          <FaPlus />
          <span>Добавить новую категорию</span>
        </button>
      </div>

      {visibleModal && <CategoryModal type="post" setVisibleModal={setVisibleModal} />}

      {visibleModal && isEdit && (
        <CategoryModal type="patch" id={categoryId} setVisibleModal={setVisibleModal} />
      )}
    </>
  );
};
export default Categories;
