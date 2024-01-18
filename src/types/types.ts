export interface IUser {
  id: number;
  email: string;
  token: string;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUser {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseUserData {
  token: string;
  user: IResponseUser;
}

export interface ICategory {
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  transactions?: [];
}

export interface ITransaction {
  title: string;
  amount: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  category: ICategory;
}

export interface IResponseTransactionLoader {
  categories: ICategory[];
  transactions: ITransaction[];
}

export interface ITransactionTableProps {
  limit: number;
}
