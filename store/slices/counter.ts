import { StateCreator } from 'zustand';
import { StoreInterface } from '@/store/slices';

export interface ICounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const counterSlice: StateCreator<
  StoreInterface,
  [['zustand/devtools', never]],
  [],
  ICounterState
> = (set, get) => ({
  count: 0,
  increment: () => set({ count: get().count + 1 }),
  decrement: () => set({ count: get().count - 1 }),
  reset: () => set({ count: 0 }),
});
