import classNames from 'classnames';
import { forwardRef } from 'react';

import { Block, BlockProps } from '../Block';

export const Card = forwardRef<HTMLDivElement, BlockProps>(
  ({ children, className, ...blockProps }, ref) => (
    <Block
      className={classNames(
        className,
        'rounded-lg bg-white p-3 shadow dark:bg-slate-800 dark:text-white'
      )}
      {...blockProps}
      ref={ref}
    >
      {children}
    </Block>
  )
);
