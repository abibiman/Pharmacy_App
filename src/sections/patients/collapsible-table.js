import PropTypes from 'prop-types';
// @mui
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
//
import createData from './utils';

// ----------------------------------------------------------------------

const TABLE_DATA = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 23),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

export default function CollapsibleTable() {
  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Condition</TableCell>

              <TableCell align="right">Date Occured</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {TABLE_DATA.map((row) => (
              <CollapsibleTableRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

function CollapsibleTableRow({ row }) {
  const collapsible = useBoolean();

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            size="small"
            color={collapsible.value ? 'inherit' : 'default'}
            onClick={collapsible.onToggle}
          >
            <Iconify
              icon={collapsible.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>

        <TableCell align="right">{row.calories}</TableCell>

        <TableCell align="right">{row.fat}</TableCell>

        <TableCell align="right">{row.carbs}</TableCell>

        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={collapsible.value} unmountOnExit>
            <Paper
              variant="outlined"
              sx={{
                py: 2,
                borderRadius: 1.5,
                ...(collapsible.value && {
                  boxShadow: (theme) => theme.customShadows.z20,
                }),
              }}
            >
              <Typography variant="h6" sx={{ m: 2, mt: 0 }}>
                History
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

CollapsibleTableRow.propTypes = {
  row: PropTypes.object,
};
