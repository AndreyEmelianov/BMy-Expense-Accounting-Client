import { FC } from 'react';

import { useAuth } from '../../hooks/useAuth';
import protectedImg from '../../assets/protected.png';
import { Link } from 'react-router-dom';

interface IProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const isAuth = useAuth();

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center mt-20 gap-10">
          <h2 className="text-2xl">
            Эту страницу могут просматривать только авторизованные пользователи
          </h2>
          <img className="w-1/3" src={protectedImg} alt="иконка защищённой страницы" />
          <Link to={'/auth'} className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600">
            Authorization
          </Link>
        </div>
      )}
    </>
  );
};
export default ProtectedRoute;
