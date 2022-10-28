import { FC, PropsWithChildren, ReactNode } from 'react';

export const Tooltip: FC<
  PropsWithChildren<{
    className?: string;
    content: ReactNode;
    placement: string;
  }>
> = ({ children }) => <>{children}</>;
