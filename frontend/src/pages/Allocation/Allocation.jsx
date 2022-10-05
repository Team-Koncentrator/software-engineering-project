import * as React from 'react';
import './Allocation.css';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Nazwa', minWidth: 170 },
  {
    id: 'population',
    label: 'Liczba uczestników',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('pl-PL')
  },
  {
    id: 'modData',
    label: 'Data ostatniej modyfikacji',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('lookup')
  },
  {
    id: 'errors',
    label: 'Konflikty',
    minWidth: 170,
    align: 'right',
    format: (value) => Boolean(value).toString()
    //format: (value) => value.toFixed(1)
  }
];

function createData(name, population, modData, errors) {
  return { name, population, modData, errors };
}

const rows = [
  createData('India', 99, '22-10-2022', 0),
  createData('China', 1, '22-10-2022', 1),
  createData('Italy', 60, '22-10-2022', 1),
  createData('United States', 32, '22-10-2022', 0),
  createData('Canada', 37, '22-10-2022', 0),
  createData('Australia', 25, '22-10-2022', 0),
  createData('Germany', 83, '22-10-2022', 0),
  createData('Ireland', 48, '22-10-2022', 0),
  createData('Mexico', 12, '22-10-2022', 0),
  createData('Japan', 18, '22-10-2022', 0),
  createData('France', 67, '22-10-2022', 0),
  createData('United Kingdom', 65, '22-10-2022', 0),
  createData('Russia', 14, '22-10-2022', 0),
  createData('Nigeria', 20, '22-10-2022', 0),
  createData('Brazil', 21, '22-10-2022', 0)
];

const Allocation = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <main>
        <div className='allocation-page__wrapper'>
          <div className='allocation-wrapper__header'>
            <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
              Moje przydziały
            </Typography>
          </div>
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.population}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            labelRowsPerPage={'Wierszy na stronę'}
            labelDisplayedRows={({ from, to, count }) => {
              return '' + from + '-' + to + ' na ' + count;
            }}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </main>
    </>
  );
};

export default Allocation;
