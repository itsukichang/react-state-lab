import { useLocalObservable } from 'mobx-react';
import { createContext, ReactNode, useContext } from 'react';
import counterStore, { CounterStore } from './CounterStore';
import photoStore, { PhotoStore } from './PhotoStore';

type GlobalStore = {
  counterStore: CounterStore;
  photoStore: PhotoStore;
};

const globalStore: GlobalStore = {
  counterStore,
  photoStore,
};

const storeContext = createContext<GlobalStore | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useLocalObservable(() => globalStore);
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
