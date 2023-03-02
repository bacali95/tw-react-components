import classNames from 'classnames';
import { ComponentProps, FC, PropsWithChildren } from 'react';

export type BlockProps = ComponentProps<'div'> & {
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
  ...props
}) => (
  <div
    className={classNames(
      className,
      centered && 'mx-auto',
      container && 'container',
      fullWidth && 'w-full',
      fullHeight && 'h-full'
    )}
    {...props}
  >
    {children}
  </div>
);
