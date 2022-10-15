import { FC, PropsWithChildren, ReactNode } from 'react';

const Tooltip: FC<
  PropsWithChildren<{
    className?: string;
    content: ReactNode;
    placement: string;
  }>
> = ({ children }) => <>{children}</>;

export default Tooltip;
