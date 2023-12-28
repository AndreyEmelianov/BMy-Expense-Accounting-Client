import { axiosInstance } from '../api/axios.api';
import { IResponseUserData, IUser, IUserData } from '../types/types';

export const AuthService = {
  async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
    try {
      const { data } = await axiosInstance.post<IResponseUserData>('user', userData);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  async login(userData: IUserData): Promise<IUser | undefined> {
    try {
      const { data } = await axiosInstance.post<IUser>('auth/login', userData);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  async getMe(): Promise<IUser | undefined> {
    try {
      const { data } = await axiosInstance.get<IUser>('auth/profile');
      if (data) return data;
    } catch (err) {
      console.log(err);
    }
  },
};
