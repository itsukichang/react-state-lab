/**
 * STATE
 */

export type CounterState = {
  count: number;
};

export const CounterInitialState: CounterState = {
  count: 0,
};

/**
 * ACTION
 */

const INCREMENT_COUNT = 'INCREMENT_COUNT' as const;
const DECREMENT_COUNT = 'DECREMENT_COUNT' as const;

const incrementCount = () => {
  return { type: INCREMENT_COUNT };
};

const decrementCount = () => {
  return { type: DECREMENT_COUNT };
};

export type ActionType =
  | ReturnType<typeof incrementCount>
  | ReturnType<typeof decrementCount>;

export const counterActions = {
  incrementCount,
  decrementCount,
};

/**
 * REDUCER
 */

export const CounterReducer = (
  state: CounterState,
  action: ActionType
): CounterState => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
