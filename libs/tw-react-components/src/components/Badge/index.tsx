import type { FC } from 'react';

import type { ButtonProps, ButtonVariant } from '../Button';
import { Button } from '../Button';

export type BadgeVariant = Exclude<ButtonVariant, 'text'>;

export type BadgeProps = Omit<ButtonProps, 'variant'> & {
  variant?: BadgeVariant;
};

export const Badge: FC<BadgeProps> = ({ size = 'small', ...props }) => (
  <Button size={size} {...props} />
);
