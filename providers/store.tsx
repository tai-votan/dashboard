'use client';

import { type PropsWithChildren, useRef } from 'react';
import type { StoreType } from '@/store';
import { initializeStore, Provider } from '@/store';

export default function StoreProvider({
  children,
  ...props
}: PropsWithChildren) {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props || {});
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
}
