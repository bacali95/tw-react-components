import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  label: string;
}>;

export const FormGroup: FC<Props> = ({ label, children }) => (
  <div className="relative flex flex-col gap-4 rounded-lg border p-4 dark:border-gray-300">
    <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-gray-500 px-2 py-1 font-medium text-white dark:bg-gray-300 dark:bg-gray-900 dark:text-gray-700">
      {label}
    </div>
    {children}
  </div>
);
