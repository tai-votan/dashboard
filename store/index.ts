import { createContext, useContext } from 'react';
import { createStore, useStore as useZustandStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import slices, { StoreInterface } from './slices';

export type StoreType = ReturnType<typeof initializeStore>;

const storeContext = createContext<StoreType | null>(null);

export const Provider = storeContext.Provider;

export function useStore<T>(selector: (state: StoreInterface) => T) {
  const store = useContext(storeContext);

  if (!store) throw new Error('Store is missing the provider');

  return useZustandStore(store, selector);
}

export function initializeStore(preloadedState = {}) {
  return createStore<StoreInterface>()(
    devtools((...arg) => ({
      ...preloadedState,
      ...slices(...arg),
    })),
  );
}
