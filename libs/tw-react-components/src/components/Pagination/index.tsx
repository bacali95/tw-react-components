import classNames from 'classnames';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import {
  ComponentProps,
  Dispatch,
  FC,
  PropsWithoutRef,
  SetStateAction,
  useEffect,
  useMemo,
} from 'react';

import { usePagination } from '../../hooks';
import { Flex } from '../Flex';

export type PaginationProps = {
  pageSize?: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const Pagination: FC<PaginationProps> = ({
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
      <Flex className="!gap-0 divide-x rounded-md border border-slate-300 bg-white dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-800">
        <PaginationItem title="First page" onClick={() => setCurrentPage(0)}>
          <ChevronsLeftIcon className="h-5 w-5" />
        </PaginationItem>
        <PaginationItem
          title="Previous page"
          onClick={() => currentPage && setCurrentPage(currentPage - 1)}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </PaginationItem>
        {pagination.map((page, index) => (
          <PaginationItem
            key={index}
            active={page !== '...' && page - 1 === currentPage}
            title={page !== '...' ? `Page ${page}` : undefined}
            onClick={page !== '...' ? () => setCurrentPage(page - 1) : undefined}
          >
            {page}
          </PaginationItem>
        ))}
        <PaginationItem
          title="Next page"
          onClick={() => currentPage + 1 < totalPages && setCurrentPage(currentPage + 1)}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </PaginationItem>
        <PaginationItem
          title="Last page"
          onClick={() =>
            setCurrentPage(
              Math.floor(
                totalItems && !(totalItems % pageSize)
                  ? (totalItems - 1) / pageSize
                  : totalItems / pageSize
              )
            )
          }
        >
          <ChevronsRightIcon className="h-5 w-5" />
        </PaginationItem>
      </Flex>
    </Flex>
  );
};

const PaginationItem: FC<PropsWithoutRef<ComponentProps<'div'> & { active?: boolean }>> = ({
  children,
  active,
  ...props
}) => (
  <Flex
    className={classNames('h-10 w-10 first:rounded-l-md last:rounded-r-md', {
      'bg-slate-100 dark:bg-slate-700': active,
      'cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700': props.onClick,
    })}
    align="center"
    justify="center"
    {...props}
  >
    {children}
  </Flex>
);