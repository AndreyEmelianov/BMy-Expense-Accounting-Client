import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';

import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/user/userSlice';
import { removeTokenFromLS } from '../../helpers/localStorage.helper';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLS('bmy-token');
    toast.success('Вы вышли из аккаунта');
    navigate('/');
  };

  return (
    <header className="flex items-center  p-4 shadow-sm bg-slate-800 backdrop-blur-sm">
      <Link to={'/'}>
        <FaBtc size={20} />
      </Link>

      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to={'/'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/transactions'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}>
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/categories'}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50')}>
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <button onClick={logoutHandler} className="btn btn-red">
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to={'/auth'} className="py-2 ml-auto text-white/50 hover:text-white">
          Log In / Sign In
        </Link>
      )}
    </header>
  );
};
export default Header;
