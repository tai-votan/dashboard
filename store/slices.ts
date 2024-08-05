import { counterSlice, ICounterState } from '@/store/slices/counter';
import { StateCreator } from 'zustand';

export type StoreInterface = ICounterState;

const slices: StateCreator<
  StoreInterface,
  [['zustand/devtools', never]],
  []
> = (...arg) => ({
  ...counterSlice(...arg),
});

export default slices;
