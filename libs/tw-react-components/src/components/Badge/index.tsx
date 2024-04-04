import { forwardRef } from 'react';

import { Button, ButtonProps, ButtonVariant } from '../Button';

export type BadgeVariant = Exclude<ButtonVariant, 'text'>;

export type BadgeProps = Omit<ButtonProps, 'variant'> & {
  variant?: BadgeVariant;
};

export const Badge = forwardRef<HTMLButtonElement, BadgeProps>(
  ({ size = 'small', ...props }, ref) => <Button size={size} {...props} ref={ref} />,
);
