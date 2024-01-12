import PropTypes from 'prop-types';
// @mui
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';

// components
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

export default function ConditionDetailsTable({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <ConditionDetailsTableRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}

ConditionDetailsTable.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function ConditionDetailsTableRow({ row }) {
  return (
    <TableRow>
      <TableCell>{row.medication}</TableCell>

      <TableCell>{row.dosage}</TableCell>

      <TableCell>{row.dateStarted ? row.dateStarted : 'Not Started'}</TableCell>

      <TableCell>{row.dateEnded ? row.dateEnded : 'Not Done'}</TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'In-Progress' && 'warning') ||
            (row.status === 'Finished' && 'success') ||
            'error'
          }
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );
}

ConditionDetailsTableRow.propTypes = {
  row: PropTypes.object,
};
