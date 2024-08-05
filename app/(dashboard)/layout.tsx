'use client';

import React from 'react';
import Sidebar from '@/components/sidebar';
import useIsCollapsed from '@/hooks/use-is-collapsed';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={cn(
          `overflow-x-hidden transition-all duration-300 md:overflow-y-hidden h-full pt-16 md:pt-7 px-4 md:px-10 md:ml-64`,
          { 'md:ml-14': isCollapsed },
        )}
      >
        {children}
      </main>
    </div>
  );
}
