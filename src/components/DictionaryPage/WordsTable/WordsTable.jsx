import React from 'react';
import { useTable } from 'react-table';
import { useMediaQuery } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProgressBar from '../ProgressBar/ProgressBar';
import ActionsBtn from '../ActionsBtn/ActionsBtn';
import css from './WordsTable.module.css';
import { useSelector } from 'react-redux';
import { selectUsersWords } from '../../../redux/words/selectors';
import Icon from '../../../shared/Icon/Icon';

const WordsTable = () => {
  const words = useSelector(selectUsersWords);

  const isMobile = useMediaQuery('(max-width:767px)');

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const columns = React.useMemo(
    () =>
      [
        {
          Header: () => (
            <div className={css.headerCell}>
              Word{' '}
              {!isMobile && (
                <Icon iconId="icon-united-kingdom" className={css.icon} />
              )}
            </div>
          ),
          accessor: 'en',
          Cell: ({ value }) => capitalizeFirstLetter(value),
        },
        {
          Header: () => (
            <div className={css.headerCell}>
              Translation{' '}
              {!isMobile && <Icon iconId="icon-ukraine" className={css.icon} />}
            </div>
          ),
          accessor: 'ua',
          Cell: ({ value }) => capitalizeFirstLetter(value),
        },
        !isMobile && {
          Header: 'Category',
          accessor: 'category',
          Cell: ({ value }) => (
            <span className={css.categoryCell}>
              {capitalizeFirstLetter(value)}
            </span>
          ),
        },
        {
          Header: 'Progress',
          accessor: 'progress',
          Cell: ({ value }) => (
            <ProgressBar progress={value} isMobile={isMobile} />
          ),
        },
        {
          Header: '',
          accessor: 'actions',
          Cell: ({ row }) => <ActionsBtn word={row.original} />,
        },
      ].filter(Boolean),
    [isMobile]
  );

  const tableInstance = useTable({ columns, data: words });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableContainer className={css.customTableContainer}>
      <Table
        {...getTableProps()}
        aria-label="table of words and progress"
        className={css.customTable}
      >
        <TableHead className={css.customHeader}>
          {headerGroups.map(headerGroup => {
            const { key, ...headerGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <TableRow
                key={key}
                {...headerGroupProps}
                className={css.customHeaderRow}
              >
                {headerGroup.headers.map(column => {
                  const { key: columnKey, ...columnProps } =
                    column.getHeaderProps();
                  return (
                    <TableCell
                      key={columnKey}
                      {...columnProps}
                      className={css.customHeaderCell}
                      sx={{
                        fontSize: '16px',
                        '@media (min-width: 768px)': { fontSize: '18px' },
                        '@media (min-width: 1440px)': { fontSize: '20px' },
                      }}
                    >
                      {column.render('Header')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()} className={css.customBody}>
          {rows.map(row => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <TableRow key={key} {...rowProps} className={css.customBodyRow}>
                {row.cells.map(cell => {
                  const { key: cellKey, ...cellProps } = cell.getCellProps();
                  return (
                    <TableCell
                      key={cellKey}
                      {...cellProps}
                      className={css.customBodyCell}
                      sx={{
                        fontWeight: '500',
                        '@media (min-width: 768px)': { fontSize: '18px' },
                        '@media (min-width: 1440px)': { fontSize: '20px' },
                      }}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WordsTable;
