import * as React from 'react';

import { cn } from '../../helpers';

export type CardProps = React.ComponentProps<'div'> & {
  dataTestId?: string;
};

const $Card = ({ className, dataTestId = 'card', ...props }: CardProps) => (
  <div
    className={cn(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
      className,
    )}
    data-slot="card"
    data-testid={dataTestId}
    {...props}
  />
);

export type CardHeaderProps = React.ComponentProps<'div'> & {
  dataTestId?: string;
};

const CardHeader = ({ className, dataTestId = 'card-header', ...props }: CardHeaderProps) => (
  <div
    className={cn(
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
      className,
    )}
    data-slot="card-header"
    data-testid={dataTestId}
    {...props}
  />
);

export type CardTitleProps = React.ComponentProps<'div'> & {
  dataTestId?: string;
};

const CardTitle = ({ className, dataTestId = 'card-title', ...props }: CardTitleProps) => (
  <div
    className={cn('leading-none font-semibold', className)}
    data-slot="card-title"
    data-testid={dataTestId}
    {...props}
  />
);

export type CardDescriptionProps = React.ComponentProps<'div'> & {
  dataTestId?: string;
};

const CardDescription = ({
  className,
  dataTestId = 'card-description',
  ...props
}: CardDescriptionProps) => (
  <div
    className={cn('text-muted-foreground text-sm', className)}
    data-slot="card-description"
    data-testid={dataTestId}
    {...props}
  />
);

export type CardActionProps = React.ComponentProps<'div'> & {
  dataTestId?: string;
};

const CardAction = ({ className, dataTestId = 'card-action', ...props }: CardActionProps) => (
  <div
    className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
    data-slot="card-action"
    data-testid={dataTestId}
    {...props}
  />
);

export type CardContentProps = React.ComponentProps<'div'> & {
  dataTestId?: string;
};

const CardContent = ({ className, dataTestId = 'card-content', ...props }: CardContentProps) => (
  <div
    className={cn('px-6', className)}
    data-slot="card-content"
    data-testid={dataTestId}
    {...props}
  />
);

export type CardFooterProps = React.ComponentProps<'div'> & {
  dataTestId?: string;
};

const CardFooter = ({ className, dataTestId = 'card-footer', ...props }: CardFooterProps) => (
  <div
    className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
    data-slot="card-footer"
    data-testid={dataTestId}
    {...props}
  />
);

export const Card = Object.assign($Card, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Action: CardAction,
  Description: CardDescription,
  Content: CardContent,
});
