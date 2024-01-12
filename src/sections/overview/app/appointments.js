import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
// utils

// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { TableHeadCustom } from 'src/components/table';
import AppointmentTableRow from 'src/sections/appointments/appointment-table-row';

// ----------------------------------------------------------------------

export default function AppAppointments({ title, subheader, tableData, tableLabels, ...other }) {
  const currentMonthData = tableData.filter((row) => {
    const appointmentDate = new Date(row.appointmentDate);
    const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed, so add 1
    return appointmentDate.getMonth() + 1 === currentMonth;
  });
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {currentMonthData.map((row) => (
                <AppAppointmentTableRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          href="/dashboard/appointments"
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

AppAppointments.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function AppAppointmentTableRow({ row }) {
  const popover = usePopover();

  // const handleDownload = () => {
  //   popover.onClose();
  //   console.info('DOWNLOAD', row.id);
  // };

  // const handlePrint = () => {
  //   popover.onClose();
  //   console.info('PRINT', row.id);
  // };

  // const handleShare = () => {
  //   popover.onClose();
  //   console.info('SHARE', row.id);
  // };

  // const handleDelete = () => {
  //   popover.onClose();
  //   console.info('DELETE', row.id);
  // };

  console.log(row);

  const dateTime = new Date(row?.appointmentDate);
  // const currentDate = new Date();

  // Extract date components
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();

  // const currentYear = currentDate.getFullYear();
  // const currentMonth = currentDate.getMonth() + 1;
  // const currentDay = currentDate.getDate();

  // Extract time components
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();
  const seconds = dateTime.getUTCSeconds();

  // const currentHours = dateTime.getUTCHours();
  // const currentMinutes = dateTime.getUTCMinutes();
  // const currentSeconds = dateTime.getUTCSeconds();

  const date = `${year}-${month}-${day}`;
  const time = `${hours}:${minutes}:${seconds}`;

  return (
    <>
      <TableRow>
        <TableCell>{row.providerName}</TableCell>

        <TableCell>{date}</TableCell>
        <TableCell>{time}</TableCell>

        <TableCell>{row.appointmentType}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'pending' && 'warning') ||
              (row.status === 'cancelled' && 'error') ||
              'success'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        {/* <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:cloud-download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover> */}
    </>
  );
}

AppAppointmentTableRow.propTypes = {
  row: PropTypes.object,
};
