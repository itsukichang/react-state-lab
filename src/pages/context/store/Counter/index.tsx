import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import {
  ActionType,
  CounterInitialState,
  CounterReducer,
  CounterState,
  counterActions,
} from './CounterStore';

import { useContext } from 'react';

export const CounterStoreContext =
  createContext<CounterState>(CounterInitialState);
export const CounterDispatchContext = createContext<Dispatch<ActionType>>(
  () => {}
);

export const CounterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(CounterReducer, CounterInitialState);

  return (
    <CounterDispatchContext.Provider value={dispatch}>
      <CounterStoreContext.Provider value={state}>
        {children}
      </CounterStoreContext.Provider>
    </CounterDispatchContext.Provider>
  );
};

export const useCounter = () => {
  const state = useContext(CounterStoreContext);
  const dispatch = useContext(CounterDispatchContext);

  const increase = () => {
    dispatch(counterActions.incrementCount());
  };

  const decrease = () => {
    dispatch(counterActions.decrementCount());
  };

  return {
    counterState: state,
    counterDispatch: dispatch,
    increase,
    decrease,
  };
};
