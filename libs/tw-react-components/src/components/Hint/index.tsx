import type { FC, PropsWithChildren, Ref } from 'react';

import { cn } from '../../helpers';
import type { BadgeProps, BadgeVariant } from '../Badge';
import { Badge } from '../Badge';
import { Block } from '../Block';
import type { Color, Size } from '../types';

export type HintRootProps = PropsWithChildren<{
  ref?: Ref<HTMLDivElement>;
  dataTestId?: string;
}>;

const HintRoot: FC<HintRootProps> = ({ children, ref, dataTestId = 'hint' }) => (
  <Block className="relative" ref={ref} dataTestId={dataTestId}>
    {children}
  </Block>
);
HintRoot.displayName = 'HintRoot';

export type HintPlacement = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

export type HintVariant = BadgeVariant;

const dotSizeClassNames: Record<
  Size,
  { base: string; top: string; right: string; bottom: string; left: string }
> = {
  small: {
    base: 'h-1.5 w-1.5',
    top: '-top-0.5',
    right: '-right-0.5',
    bottom: '-bottom-0.5',
    left: '-left-0.5',
  },
  medium: {
    base: 'h-2.5 w-2.5',
    top: '-top-1',
    right: '-right-1',
    bottom: '-bottom-1',
    left: '-left-1',
  },
};

const colorClassNames: Record<Color, string> = {
  slate: 'bg-slate-500 dark:bg-slate-600',
  gray: 'bg-gray-500 dark:bg-gray-600',
  zinc: 'bg-zinc-500 dark:bg-zinc-600',
  neutral: 'bg-neutral-500 dark:bg-neutral-600',
  stone: 'bg-stone-500 dark:bg-stone-600',
  red: 'bg-red-500 dark:bg-red-600',
  orange: 'bg-orange-500 dark:bg-orange-600',
  amber: 'bg-amber-500 dark:bg-amber-600',
  yellow: 'bg-yellow-500 dark:bg-yellow-600',
  lime: 'bg-lime-500 dark:bg-lime-600',
  green: 'bg-green-500 dark:bg-green-600',
  emerald: 'bg-emerald-500 dark:bg-emerald-600',
  teal: 'bg-teal-500 dark:bg-teal-600',
  cyan: 'bg-cyan-500 dark:bg-cyan-600',
  sky: 'bg-sky-500 dark:bg-sky-600',
  blue: 'bg-blue-500 dark:bg-blue-600',
  indigo: 'bg-indigo-500 dark:bg-indigo-600',
  violet: 'bg-violet-500 dark:bg-violet-600',
  fuchsia: 'bg-fuchsia-500 dark:bg-fuchsia-600',
  purple: 'bg-purple-500 dark:bg-purple-600',
  pink: 'bg-pink-500 dark:bg-pink-600',
  rose: 'bg-rose-500 dark:bg-rose-600',
};

export type HintDotProps = {
  size?: Size;
  placement?: HintPlacement;
  color?: Color;
  ping?: boolean;
  ref?: Ref<HTMLDivElement>;
  dataTestId?: string;
};

const HintDot: FC<HintDotProps> = ({
  size = 'medium',
  placement = 'top-right',
  color = 'green',
  ping,
  ref,
  dataTestId = 'hint-dot',
}) => (
  <>
    <Block
      className={cn('absolute rounded-full', colorClassNames[color], dotSizeClassNames[size].base, {
        [`${dotSizeClassNames[size].top} ${dotSizeClassNames[size].left}`]:
          placement === 'top-left',
        [`${dotSizeClassNames[size].top} ${dotSizeClassNames[size].right}`]:
          placement === 'top-right',
        [`${dotSizeClassNames[size].bottom} ${dotSizeClassNames[size].right}`]:
          placement === 'bottom-right',
        [`${dotSizeClassNames[size].bottom} ${dotSizeClassNames[size].left}`]:
          placement === 'bottom-left',
      })}
      ref={ref}
      data-testid={dataTestId}
    />
    {ping && (
      <Block
        className={cn(
          'absolute animate-ping rounded-full',
          colorClassNames[color],
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
  dataTestId?: string;
};

const HintBadge: FC<HintBadgeProps> = ({
  className,
  size = 'small',
  placement = 'top-right',
  dataTestId = 'hint-badge',
  ...props
}) => (
  <Badge
    className={cn(
      'absolute z-10 px-1',
      size === 'small' ? 'h-4' : 'h-5',
      {
        [`${badgeSizeClassNames.top} ${badgeSizeClassNames.left}`]: placement === 'top-left',
        [`${badgeSizeClassNames.top} ${badgeSizeClassNames.right}`]: placement === 'top-right',
        [`${badgeSizeClassNames.bottom} ${badgeSizeClassNames.right}`]:
          placement === 'bottom-right',
        [`${badgeSizeClassNames.bottom} ${badgeSizeClassNames.left}`]: placement === 'bottom-left',
      },
      className,
    )}
    size={size}
    dataTestId={dataTestId}
    {...props}
  />
);
HintBadge.displayName = 'HintBadge';

export const Hint = Object.assign(HintRoot, { Dot: HintDot, Badge: HintBadge });
