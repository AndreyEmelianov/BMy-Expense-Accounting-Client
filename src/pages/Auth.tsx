import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { AuthService } from '../services/auth.service';
import { setTokenToLS } from '../helpers/localStorage.helper';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/user/userSlice';

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({ email, password });

      if (data) {
        toast.success('Аккаунт успешно создан');
        setIsLogin(!isLogin);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({ email, password });

      if (data) {
        setTokenToLS('bmy-token', data.token);
        dispatch(login(data));
        toast.success('Вы успешно залогинились!');
        navigate('/');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  return (
    <div className="mt-40 flex flex-col justify-center items-center bg-slate-900">
      <h1 className="text-center text-2xl mb-10">{isLogin ? 'Login' : 'Registration'}</h1>

      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        className="flex w-1/3 flex-col mx-auto gap-5">
        <input
          type="text"
          placeholder="E-mail"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
            Don't you have an account?
          </button>
        ) : (
          <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};
export default Auth;
