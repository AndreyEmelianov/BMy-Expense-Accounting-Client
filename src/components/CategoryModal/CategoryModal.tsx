import { FC } from 'react';
import { Form } from 'react-router-dom';

interface ICategoryModalProps {
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void;
}

const CategoryModal: FC<ICategoryModalProps> = ({ type, id, setVisibleModal }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form
        action="/categories"
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900">
        <label htmlFor="title">
          <small>Название категории</small>
          <input type="text" name="title" placeholder="Название..." className="input w-full" />
          <input type="hidden" value={id} name="id" />
        </label>

        <div className="flex items-center gap-2">
          <button className="btn btn-green" type="submit">
            {type === 'patch' ? 'Сохранить' : 'Создать'}
          </button>
          <button onClick={() => setVisibleModal(false)} className="btn btn-red">
            Закрыть
          </button>
        </div>
      </Form>
    </div>
  );
};
export default CategoryModal;
