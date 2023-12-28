import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { getTokenFromLS } from './helpers/localStorage.helper';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/user/userSlice';

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLS();

    try {
      if (token) {
        const data = await AuthService.getMe();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
