import { ElementRef, PropsWithChildren, forwardRef } from 'react';

import { cn } from '../../helpers';
import { Badge, BadgeProps, BadgeVariant } from '../Badge';
import { Block } from '../Block';
import { Size } from '../types';

const HintRoot = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => (
  <Block className="relative" ref={ref}>
    {children}
  </Block>
));
HintRoot.displayName = 'HintRoot';

export type HintPlacement = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

export type HintVariant = Exclude<BadgeVariant, 'default' | 'inverse'>;

const dotSizeClassNames: Record<
  Size,
  { base: string; top: string; right: string; bottom: string; left: string }
> = {
  small: {
    base: 'h-2 w-2',
    top: '-top-0.5',
    right: '-right-0.5',
    bottom: '-bottom-0.5',
    left: '-left-0.5',
  },
  medium: {
    base: 'h-3 w-3',
    top: '-top-1',
    right: '-right-1',
    bottom: '-bottom-1',
    left: '-left-1',
  },
  large: {
    base: 'h-4 w-4',
    top: '-top-1.5',
    right: '-right-1.5',
    bottom: '-bottom-1.5',
    left: '-left-1.5',
  },
};

const variantClassNames: Record<HintVariant, string> = {
  red: 'bg-red-500 dark:bg-red-600',
  orange: 'bg-orange-500 dark:bg-orange-600',
  yellow: 'bg-yellow-500 dark:bg-yellow-600',
  green: 'bg-green-500 dark:bg-green-600',
  blue: 'bg-blue-500 dark:bg-blue-600',
  purple: 'bg-purple-500 dark:bg-purple-600',
};

export type HintDotProps = {
  size?: Size;
  placement?: HintPlacement;
  variant?: HintVariant;
  ping?: boolean;
};

const HintDot = forwardRef<HTMLDivElement, HintDotProps>(
  ({ size = 'medium', placement = 'top-right', variant = 'green', ping }, ref) => (
    <>
      <Block
        className={cn(
          'absolute rounded-full ',
          variantClassNames[variant],
          dotSizeClassNames[size].base,
          {
            [`${dotSizeClassNames[size].top} ${dotSizeClassNames[size].left}`]:
              placement === 'top-left',
            [`${dotSizeClassNames[size].top} ${dotSizeClassNames[size].right}`]:
              placement === 'top-right',
            [`${dotSizeClassNames[size].bottom} ${dotSizeClassNames[size].right}`]:
              placement === 'bottom-right',
            [`${dotSizeClassNames[size].bottom} ${dotSizeClassNames[size].left}`]:
              placement === 'bottom-left',
          },
        )}
        ref={ref}
      />
      {ping && (
        <Block
          className={cn(
            'absolute animate-ping rounded-full ',
            variantClassNames[variant],
            dotSizeClassNames[size].base,
            {
              [`${dotSizeClassNames[size].top} ${dotSizeClassNames[size].left}`]:
                placement === 'top-left',
              [`${dotSizeClassNames[size].top} ${dotSizeClassNames[size].right}`]:
                placement === 'top-right',
              [`${dotSizeClassNames[size].bottom} ${dotSizeClassNames[size].right}`]:
                placement === 'bottom-right',
              [`${dotSizeClassNames[size].bottom} ${dotSizeClassNames[size].left}`]:
                placement === 'bottom-left',
            },
          )}
        />
      )}
    </>
  ),
);
HintDot.displayName = 'HintDot';

const badgeSizeClassNames: { top: string; right: string; bottom: string; left: string } = {
  top: 'top-0 -translate-y-1/2',
  right: 'right-2 translate-x-full',
  bottom: 'bottom-0 translate-y-1/2',
  left: 'left-2 -translate-x-full',
};

export type HintBadgeProps = BadgeProps & {
  placement?: HintPlacement;
};

const HintBadge = forwardRef<ElementRef<typeof Badge>, HintBadgeProps>(
  ({ className, size = 'small', placement = 'top-right', variant = 'green', ...props }, ref) => (
    <Badge
      className={cn(
        'absolute',
        {
          'h-5 px-2': size === 'small',
          'h-6 px-3': size !== 'small',
          [`${badgeSizeClassNames.top} ${badgeSizeClassNames.left}`]: placement === 'top-left',
          [`${badgeSizeClassNames.top} ${badgeSizeClassNames.right}`]: placement === 'top-right',
          [`${badgeSizeClassNames.bottom} ${badgeSizeClassNames.right}`]:
            placement === 'bottom-right',
          [`${badgeSizeClassNames.bottom} ${badgeSizeClassNames.left}`]:
            placement === 'bottom-left',
        },
        className,
      )}
      size={size}
      variant={variant}
      {...props}
      ref={ref}
    />
  ),
);
HintBadge.displayName = 'HintBadge';

export const Hint = Object.assign(HintRoot, { Dot: HintDot, Badge: HintBadge });
