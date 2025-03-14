import type { FC } from 'react';

import { cn } from '../../helpers';

type Props = { className?: string; fullScreen?: boolean; dataTestId?: string };

export const Spinner: FC<Props> = ({ className, fullScreen, dataTestId = 'spinner' }) => (
  <div
    className={cn(
      'flex w-full items-center justify-center bg-white dark:bg-slate-900',
      {
        'h-screen': fullScreen,
        'h-full': !fullScreen,
      },
      className,
    )}
    data-testid={dataTestId}
  >
    <svg
      className="h-8 w-8 animate-spin text-black dark:text-white"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
);
