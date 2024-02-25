import classNames from 'classnames';
import { forwardRef } from 'react';

import { Block, BlockProps } from '../Block';

export const Card = forwardRef<HTMLDivElement, BlockProps>(
  ({ children, className, ...blockProps }, ref) => (
    <Block className={classNames(className, 'p-3')} {...blockProps} ref={ref}>
      {children}
    </Block>
  )
);
