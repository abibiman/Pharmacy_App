// @mui
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// components
import Scrollbar from 'src/components/scrollbar';
import { useTable, TablePaginationCustom } from 'src/components/table';

// ----------------------------------------------------------------------

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const TABLE_DATA = [
  createData('70 mg/dL', 'IN', '21/03/2022', '8:35 AM'),
  createData('73 mg/dL', 'IN', '22/03/2022', '8:35 AM'),
  createData('75 mg/dL', 'IN', '23/03/2022', '8:35 AM'),
  createData('72 mg/dL', 'IN', '24/03/2022', '8:35 AM'),
  createData('71 mg/dL', 'IN', '25/03/2022', '8:35 AM'),
  createData('71 mg/dL', 'IN', '26/03/2022', '8:35 AM'),
  createData('79 mg/dL', 'IN', '27/03/2022', '8:35 AM'),
  createData('77 mg/dL', 'IN', '28/03/2022', '8:35 AM'),
  createData('69 mg/dL', 'IN', '29/03/2022', '8:35 AM'),
  createData('70 mg/dL', 'IN', '30/03/2022', '8:35 AM'),

];

const COLUMNS = [
  { id: 'name', label: 'Sugar Level', minWidth: 170 },


  {
    id: 'population',
    label: 'Date Captured',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Time Captured',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

// ----------------------------------------------------------------------

export default function VitalsBloodSugar() {
  const table = useTable({ defaultRowsPerPage: 10 });

  return (
    <>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar sx={{ maxHeight: 400 }}>
          <Table stickyHeader sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{
                    background: (theme) => theme.palette.background.paper,
                  }}
                >
                  Metric
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={3}
                  sx={{ background: (theme) => theme.palette.background.paper }}
                >
                  Details
                </TableCell>
              </TableRow>

              <TableRow>
                {COLUMNS.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 56, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {TABLE_DATA.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              ).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {COLUMNS.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={TABLE_DATA.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}
