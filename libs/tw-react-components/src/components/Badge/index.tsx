import type { FC } from 'react';

import { cn } from '../../helpers';
import type { ButtonProps, ButtonVariant } from '../Button';
import { Button } from '../Button';

export type BadgeVariant = Exclude<ButtonVariant, 'text'>;

export type BadgeProps = Omit<ButtonProps, 'variant'> & {
  variant?: BadgeVariant;
  dataTestId?: string;
};

export const Badge: FC<BadgeProps> = ({
  size = 'small',
  dataTestId = 'badge',
  className,
  ...props
}) => (
  <Button
    size={size}
    dataTestId={dataTestId}
    className={cn(className, {
      'cursor-default': !props.onClick,
      'cursor-pointer': props.onClick,
    })}
    {...props}
  />
);
