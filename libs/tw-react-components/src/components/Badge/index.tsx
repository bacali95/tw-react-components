import { forwardRef } from 'react';

import type { ButtonProps, ButtonVariant } from '../Button';
import { Button } from '../Button';

export type BadgeVariant = Exclude<ButtonVariant, 'text'>;

export type BadgeProps = Omit<ButtonProps, 'variant'> & {
  variant?: BadgeVariant;
};

export const Badge = forwardRef<HTMLButtonElement, BadgeProps>(
  ({ size = 'small', ...props }, ref) => <Button size={size} {...props} ref={ref} />,
);
