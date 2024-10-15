import React, { useEffect } from 'react';
import { useTable } from 'react-table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProgressBar from '../ProgressBar/ProgressBar';
import ActionsBtn from '../ActionsBtn/ActionsBtn';
import css from './WordsTable.module.css';
import { useSelector } from 'react-redux';
import { selectUsersWords } from '../../../redux/words/selectors';

const WordsTable = () => {
  const words = useSelector(selectUsersWords);
  console.log(words);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Word',
        accessor: 'en',
      },
      {
        Header: 'Translation',
        accessor: 'ua',
      },
      {
        Header: 'Progress',
        accessor: 'progress',
        Cell: ({ value }) => <ProgressBar progress={value} />,
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: ({ row }) => <ActionsBtn word={row.original} />,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: words });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()} aria-label="table of words and progress">
        <TableHead>
          {headerGroups.map(headerGroup => {
            const { key, ...headerGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <TableRow key={key} {...headerGroupProps}>
                {headerGroup.headers.map(column => {
                  const { key: columnKey, ...columnProps } =
                    column.getHeaderProps();
                  return (
                    <TableCell key={columnKey} {...columnProps}>
                      {column.render('Header')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <TableRow key={key} {...rowProps}>
                {row.cells.map(cell => {
                  const { key: cellKey, ...cellProps } = cell.getCellProps();
                  return (
                    <TableCell key={cellKey} {...cellProps}>
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
