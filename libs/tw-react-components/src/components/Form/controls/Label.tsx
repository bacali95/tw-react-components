import { HelpCircle } from 'lucide-react';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { cn } from '../../../helpers';
import { Tooltip } from '../../Tooltip';

type Props = {
  className?: string;
  description?: ReactNode;
  required?: boolean;
  hasErrors?: boolean;
  htmlFor?: string;
  dataTestId?: string;
};

export const Label: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  description,
  required,
  hasErrors,
  htmlFor,
  dataTestId = 'label',
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
      data-testid={dataTestId}
    >
      {children}
      {description && (
        <Tooltip
          content={<div className="max-w-xs">{description}</div>}
          placement="top"
          asChild
          dataTestId={`${dataTestId}-description-tooltip`}
        >
          <HelpCircle className="h-4 w-4" data-testid={`${dataTestId}-description-tooltip-icon`} />
        </Tooltip>
      )}
      {required && <span className="text-red-600">*</span>}
    </label>
  );
};
