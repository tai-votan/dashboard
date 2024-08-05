import { cn } from '@/lib/utils';
import { SideLink } from '@/types/nav';
import {
  CalendarMinus2,
  ChevronLeft,
  Fingerprint,
  LayoutDashboard,
  Map,
  Menu,
  Repeat,
  Settings,
  Users,
  XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Layout } from './layout';
import Nav from './nav';
import { Button } from './ui/button';

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',

    href: '/dashboard',
    icon: <LayoutDashboard size={16} />,
  },
  {
    title: 'Nhân viên',

    href: '/users',
    icon: <Users size={16} />,
    sub: [
      {
        title: 'Chấm công',
        icon: <Fingerprint size={16} />,
        href: '/timesheet',
      },
      {
        title: 'Xin nghỉ phép',
        icon: <CalendarMinus2 size={16} />,
        href: '/attendance',
      },
      {
        title: 'Đề nghị đổi ca',
        icon: <Repeat size={16} />,
        href: '/change-shift',
      },
      {
        title: 'Danh sách nhân viên',
        icon: <Users size={16} />,
        href: '/users',
      },
    ],
  },
  {
    title: 'Cửa hàng',
    href: '/stores',
    icon: <Map size={16} />,
  },
  {
    title: 'Cài đặt',
    href: '/settings',
    icon: <Settings size={16} />,
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-all duration-300 md:bottom-0 md:right-auto md:h-svh md:w-64`,
        { 'md:w-14': isCollapsed },
        className,
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={cn(
          `absolute inset-0 transition-[opacity] delay-100 duration-700 h-0 opacity-0 w-full bg-black md:hidden`,
          { 'h-svh opacity-50': navOpened },
        )}
      />

      <Layout fixed className={cn({ 'h-svh': navOpened })}>
        {/* Header */}
        <Layout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4"
        >
          <div
            className={cn(`flex items-center`, {
              'gap-2': !isCollapsed,
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className={cn('transition-all duration-300 h-8 w-8', {
                'h-6 w-6': isCollapsed,
              })}
            >
              <rect width="256" height="256" fill="none" />
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <div
              className={cn(
                'flex flex-col justify-end truncate visible w-auto',
                { 'invisible w-0': isCollapsed },
              )}
            >
              <span className="font-medium">Shadcn Admin</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <XIcon size={16} /> : <Menu size={16} />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={cn('z-40 h-full flex-1 overflow-auto max-h-screen', {
            'max-h-0 py-0 md:max-h-screen md:py-2': !navOpened,
          })}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-4 top-10 z-50 hidden rounded-full md:inline-flex size-7"
        >
          <ChevronLeft
            className={cn('size-4', { 'rotate-180': isCollapsed })}
          />
        </Button>
      </Layout>
    </aside>
  );
}
