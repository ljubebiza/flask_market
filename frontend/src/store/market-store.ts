import {
  addToBalance,
  removeUserData,
  setUser,
  subtactFromBalance,
} from "../reducers/reducers";
import { User } from "../types/user";
import { getLocalStorageUser } from "../utils/user_helpers";
import { initStore } from "./store";

export type State = {
  user: Partial<User>;
  token: string;
};

const configureStore = () => {
  const token = localStorage.getItem("token");

  const initialState: State = {
    user: getLocalStorageUser() || {},
    token: token || "",
  };

  const actions = {
    SET_USER: setUser,
    REMOVE_USER: removeUserData,
    ADD_TO_BALANCE: addToBalance,
    REMOVE_FROM_BALANCE: subtactFromBalance,
  };

  initStore(actions, initialState);
};

export default configureStore;
