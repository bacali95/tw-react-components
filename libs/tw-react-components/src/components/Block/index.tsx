import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

export type BlockProps = {
  className?: string;
  centered?: boolean;
  container?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

export const Block: FC<PropsWithChildren<BlockProps>> = ({
  children,
  className,
  centered,
  container,
  fullWidth,
  fullHeight,
}) => (
  <div
    className={classNames(
      className,
      centered && 'mx-auto',
      container && 'container',
      fullWidth && 'w-full',
      fullHeight && 'h-full'
    )}
  >
    {children}
  </div>
);
