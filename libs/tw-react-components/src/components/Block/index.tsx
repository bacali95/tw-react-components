import classNames from 'classnames';
import { ComponentProps, PropsWithoutRef, forwardRef } from 'react';

export type BlockProps = PropsWithoutRef<
  ComponentProps<'div'> & {
    className?: string;
    centered?: boolean;
    container?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
  }
>;

export const Block = forwardRef<HTMLDivElement, BlockProps>(
  ({ children, className, centered, container, fullWidth, fullHeight, ...props }, ref) => (
    <div
      className={classNames(
        className,
        centered && 'mx-auto',
        container && 'container',
        fullWidth && 'w-full',
        fullHeight && 'h-full'
      )}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
);
