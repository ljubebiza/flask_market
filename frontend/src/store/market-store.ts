import { ACTIONS } from "../reducers/actions";
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
    [ACTIONS.SET_USER]: setUser,
    [ACTIONS.REMOVE_USER]: removeUserData,
    [ACTIONS.ADD_TO_BALANCE]: addToBalance,
    [ACTIONS.REMOVE_FROM_BALANCE]: subtactFromBalance,
  };

  initStore(actions, initialState);
};

export default configureStore;
