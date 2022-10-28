import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, PropsWithChildren, ReactNode } from 'react';

import { Tooltip } from '../../Tooltip';

type Props = {
  description?: ReactNode;
  required?: boolean;
  hasErrors?: boolean;
  htmlFor?: string;
};

export const Label: FC<PropsWithChildren<Props>> = ({
  children,
  description,
  required,
  hasErrors,
  htmlFor,
}) => {
  return !children ? null : (
    <label
      className={classNames('flex items-center gap-1 font-medium', {
        'text-gray-700 dark:text-gray-100': !hasErrors,
        'text-red-600 dark:text-red-500': hasErrors,
      })}
      htmlFor={htmlFor}
    >
      <span>
        {children} {required && <span className="text-red-600">*</span>}
      </span>
      {description && (
        <Tooltip content={<div className="max-w-xs">{description}</div>} placement="right">
          <QuestionMarkCircleIcon className="h-5 w-5" />
        </Tooltip>
      )}
    </label>
  );
};
