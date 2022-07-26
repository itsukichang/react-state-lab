import { useContext as useContextOrig, type Context } from 'react';

export function useContext<Store>(context: Context<Store | null>) {
  const store = useContextOrig(context);
  if (!store) {
    throw new Error(`Need to pass a value to the context`);
  }
  return store;
}
