import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, Fragment, PropsWithChildren } from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';

export type DialogProps = PropsWithChildren<{
  title?: string;
  isOpen?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  onClose: () => void;
}>;

export const Dialog: FC<DialogProps> = ({
  children,
  title,
  isOpen = false,
  size = 'lg',
  onClose,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="fixed inset-0 z-10 z-[1000] overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={classNames(
                  'w-full transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all dark:bg-gray-800',
                  {
                    'max-w-xs': size === 'xs',
                    'max-w-sm': size === 'sm',
                    'max-w-md': size === 'md',
                    'max-w-lg': size === 'lg',
                    'max-w-xl': size === 'xl',
                    'max-w-2xl': size === '2xl',
                    'max-w-3xl': size === '3xl',
                    'max-w-4xl': size === '4xl',
                    'max-w-5xl': size === '5xl',
                    'max-w-6xl': size === '6xl',
                    'max-w-7xl': size === '7xl',
                    'max-w-full': size === 'full',
                  }
                )}
              >
                <Flex className="text-gray-900 dark:text-gray-100" align="center" fullWidth>
                  {title && (
                    <HeadlessDialog.Title className="text-lg font-medium leading-6">
                      {title}
                    </HeadlessDialog.Title>
                  )}
                  <Button
                    className="ml-auto"
                    prefixIcon={XMarkIcon}
                    size="small"
                    onClick={onClose}
                  />
                </Flex>
                {children && <div className="mt-4 dark:text-white">{children}</div>}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
