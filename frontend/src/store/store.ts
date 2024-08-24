import { useEffect, useState } from "react";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type GlobalState<T = any> = T;

type Action<TPayload = any, TResult = any> = (
  state: GlobalState,
  payload: TPayload,
) => TResult;

type Actions = {
  [key: string]: Action<any, any>;
};

let globalState: GlobalState = {};
let listeners: StateSetter<GlobalState>[] = [];
let actions: Actions = {};

export const useStore = () => {
  const setState = useState<GlobalState>(globalState)[1];

  const dispatch = <TAction extends keyof Actions>(
    actionIntentifier: TAction,
    payload: Parameters<Actions[TAction]>[1],
  ) => {
    const newState = actions[actionIntentifier]({ ...globalState }, payload);

    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((listener) => listener !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions: Actions, initialState: GlobalState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};
