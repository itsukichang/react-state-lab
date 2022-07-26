import { createContext, useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { useContext } from '../util';

export type CounterStore = {
  count: number;
};

export function createCounterStore(): CounterStore {
  return proxy({ count: 0 });
}

export const CounterStoreContext = createContext<CounterStore | null>(null);

export function useWritableCounterStore() {
  return useContext(CounterStoreContext);
}

export function useCounterStore() {
  const store = useWritableCounterStore();
  return useSnapshot(store);
}

export function useUpdateCounter() {
  const store = useWritableCounterStore();

  const handleIncrement = useCallback(() => {
    store.count += 1;
  }, [store]);

  const handleDecrement = useCallback(() => {
    store.count -= 1;
  }, [store]);

  return {
    handleIncrement,
    handleDecrement,
  };
}
