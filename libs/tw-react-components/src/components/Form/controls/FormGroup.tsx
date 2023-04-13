import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  label: string;
}>;

export const FormGroup: FC<Props> = ({ label, children }) => (
  <div className="relative flex flex-col gap-4 rounded-lg border p-4 dark:border-slate-300">
    <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-slate-500 px-2 py-1 font-medium text-white dark:bg-slate-300 dark:bg-slate-900 dark:text-slate-400">
      {label}
    </div>
    {children}
  </div>
);
