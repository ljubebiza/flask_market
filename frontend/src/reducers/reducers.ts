import { State } from "../store/market-store";
import { User } from "../types/user";

export const setUser = (user: User) => {
  return { user };
};

export const removeUserData = () => {
  return { user: {} };
};

export const addToBalance = (state: State, amount: number) => {
  const { user } = state;

  return { user: { ...user, balance: (user.balance ?? 0) + amount } };
};

export const subtactFromBalance = (state: State, amount: number) => {
  const { user } = state;

  return { user: { ...user, balance: (user.balance ?? 0) - amount } };
};
