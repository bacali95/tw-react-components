import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

import { Block, BlockProps } from '../Block';

export const Card: FC<PropsWithChildren<BlockProps>> = ({ children, className, ...blockProps }) => (
  <Block
    className={classNames(
      className,
      'rounded-lg bg-white py-3 px-2 shadow dark:bg-slate-800 dark:text-white'
    )}
    {...blockProps}
  >
    {children}
  </Block>
);
