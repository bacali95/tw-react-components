import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import type { ComponentProps, Dispatch, FC, PropsWithoutRef, SetStateAction } from 'react';
import { useEffect, useMemo } from 'react';

import { cn } from '../../helpers';
import { usePagination } from '../../hooks';
import { Flex } from '../Flex';

export type PaginationProps = {
  disabled?: boolean;
  pageSize?: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const Pagination: FC<PaginationProps> = ({
  disabled,
  pageSize = 10,
  currentPage,
  totalItems,
  setCurrentPage,
}) => {
  const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [pageSize, totalItems]);
  const pagination = usePagination(currentPage + 1, totalPages);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(0, totalPages - 1)));
  }, [setCurrentPage, totalPages]);

  return (
    <Flex justify="end">
      <Flex className="h-9 gap-0 divide-x rounded-md border border-slate-300 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800">
        <PaginationItem
          title="First page"
          onClick={() => setCurrentPage(0)}
          disabled={!currentPage || disabled}
        >
          <ChevronsLeftIcon className="h-4 w-4" />
        </PaginationItem>
        <PaginationItem
          title="Previous page"
          onClick={() => currentPage && setCurrentPage(currentPage - 1)}
          disabled={!currentPage || disabled}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </PaginationItem>
        {pagination.map((page, index) => (
          <PaginationItem
            key={index}
            active={page !== '...' && page - 1 === currentPage}
            title={page !== '...' ? `Page ${page}` : undefined}
            onClick={page !== '...' ? () => setCurrentPage(page - 1) : undefined}
            disabled={page === '...' || disabled}
          >
            {page}
          </PaginationItem>
        ))}
        <PaginationItem
          title="Next page"
          onClick={() => currentPage + 1 < totalPages && setCurrentPage(currentPage + 1)}
          disabled={currentPage + 1 === totalPages || disabled}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </PaginationItem>
        <PaginationItem
          title="Last page"
          onClick={() =>
            setCurrentPage(
              Math.floor(
                totalItems && !(totalItems % pageSize)
                  ? (totalItems - 1) / pageSize
                  : totalItems / pageSize,
              ),
            )
          }
          disabled={currentPage + 1 === totalPages || disabled}
        >
          <ChevronsRightIcon className="h-4 w-4" />
        </PaginationItem>
      </Flex>
    </Flex>
  );
};

const PaginationItem: FC<
  PropsWithoutRef<ComponentProps<'div'> & { active?: boolean; disabled?: boolean }>
> = ({ children, active, disabled, ...props }) => (
  <Flex
    className={cn('w-9 text-sm first:rounded-l-md last:rounded-r-md', {
      'text-slate-400 dark:text-slate-500': disabled,
      'bg-slate-100 dark:bg-slate-900': active,
      'cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-900': !disabled && props.onClick,
    })}
    align="center"
    justify="center"
    fullHeight
    {...props}
  >
    {children}
  </Flex>
);
