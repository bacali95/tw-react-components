import { HelpCircle } from 'lucide-react';
import { FC, PropsWithChildren, ReactNode } from 'react';

import { cn } from '../../../helpers';
import { Tooltip } from '../../Tooltip';

type Props = {
  className?: string;
  description?: ReactNode;
  required?: boolean;
  hasErrors?: boolean;
  htmlFor?: string;
};

export const Label: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  description,
  required,
  hasErrors,
  htmlFor,
}) => {
  return !children ? null : (
    <label
      className={cn(
        'flex items-center gap-1 font-medium',
        {
          'text-slate-700 dark:text-slate-100': !hasErrors,
          'text-red-600 dark:text-red-500': hasErrors,
        },
        className,
      )}
      htmlFor={htmlFor}
    >
      <span>
        {children} {required && <span className="text-red-600">*</span>}
      </span>
      {description && (
        <Tooltip content={<div className="max-w-xs">{description}</div>} placement="right">
          <HelpCircle className="h-5 w-5" />
        </Tooltip>
      )}
    </label>
  );
};
