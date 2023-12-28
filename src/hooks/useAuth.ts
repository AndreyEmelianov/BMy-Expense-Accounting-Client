import { useAppSelector } from '../store/hooks';

export const useAuth = (): boolean => {
  const isAuth = useAppSelector(({ user }) => user.isAuth);

  return isAuth;
};
