import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import type { ComponentProps, Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useMemo } from 'react';

import { cn } from '../../helpers';
import { usePagination } from '../../hooks';
import { Flex } from '../Flex';

export type PaginationProps = {
  disabled?: boolean;
  pageSize?: number;
  totalItems: number;
  currentPage: number;
  dataTestId?: string;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const Pagination: FC<PaginationProps> = ({
  disabled,
  pageSize = 10,
  currentPage,
  totalItems,
  dataTestId = 'pagination',
  setCurrentPage,
}) => {
  const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [pageSize, totalItems]);
  const pagination = usePagination(currentPage + 1, totalPages);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(0, totalPages - 1)));
  }, [setCurrentPage, totalPages]);

  return (
    <Flex justify="end" dataTestId={dataTestId}>
      <Flex className="h-9 gap-0 divide-x rounded-md border border-slate-300 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800">
        <PaginationItem
          title="First page"
          onClick={() => setCurrentPage(0)}
          disabled={!currentPage || disabled}
          dataTestId={`${dataTestId}-first-page`}
        >
          <ChevronsLeftIcon className="h-4 w-4" />
        </PaginationItem>
        <PaginationItem
          title="Previous page"
          onClick={() => currentPage && setCurrentPage(currentPage - 1)}
          disabled={!currentPage || disabled}
          dataTestId={`${dataTestId}-previous-page`}
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
            dataTestId={`${dataTestId}-page-${page}`}
          >
            {page}
          </PaginationItem>
        ))}
        <PaginationItem
          title="Next page"
          onClick={() => currentPage + 1 < totalPages && setCurrentPage(currentPage + 1)}
          disabled={currentPage + 1 === totalPages || disabled}
          dataTestId={`${dataTestId}-next-page`}
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
          dataTestId={`${dataTestId}-last-page`}
        >
          <ChevronsRightIcon className="h-4 w-4" />
        </PaginationItem>
      </Flex>
    </Flex>
  );
};

const PaginationItem: FC<
  ComponentProps<'div'> & { active?: boolean; disabled?: boolean; dataTestId?: string }
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
