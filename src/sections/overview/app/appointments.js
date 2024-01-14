import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

// @mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useBoolean } from 'src/hooks/use-boolean';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import FormDialog from './form-dialog';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LoadingButton } from '@mui/lab';
// utils

// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { TableHeadCustom } from 'src/components/table';
import AppointmentTableRow from 'src/sections/appointments/appointment-table-row';
import {useNavigate} from 'react-router'

// ----------------------------------------------------------------------

export default function AppAppointments({ title, subheader, tableData, tableLabels, ...other }) {
  // const currentMonthData = tableData.filter((row) => {
  //   const appointmentDate = new Date(row.appointmentDate);
  //   const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed, so add 1
  //   return appointmentDate.getMonth() + 1 === currentMonth;
  // });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{ mb: 3, textAlign: 'center' }}  // Centering the text
      />
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.slice(0,5).map((row) => (
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
          href="/dashboard/order"
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
  const navigate = useNavigate()
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

  // console.log(row);

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

  const [openDialogBox, setOpenDialogBox] = useState(false);
  const confirm = useBoolean();
  const [openPopUp, setOpenPopUp] = useState(false);
  const dialog = useBoolean();
  const redialog = useBoolean()

  const [appointmentDateInput, setAppointmentDateInput] = useState('');
  const [appointmentTimeInput, setAppointmentTimeInput] = useState('');
  const [notes,setNotes] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false);




  return (
    <>
      <TableRow>

        <TableCell>{`# ${row.orderNo}`}</TableCell>
        <TableCell>{row.patient}</TableCell>
        <TableCell>{row.reqDate}</TableCell>
        <TableCell>{row.orderType}</TableCell>
        {/* <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'Order Confirmed' && 'info') ||
            (row.status === 'Awaiting Confirmation' && 'secondary') ||

            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell> */}

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'N' && 'success') ||
            (row.priority === 'Urgent' && 'warning') ||
            (row.priority === 'Emergency' && 'error') ||
            'default'
          }
        >
          {row.priority}
        </Label>
      </TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem           
        onClick={() => {
          setOpenDialogBox(true);
          // onViewRow();
          popover.onClose();
          }}>
          <Iconify icon="carbon:view" />
          View Order
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={()=>{alert("Cancel Order")}}>
          <Iconify icon="flat-color-icons:cancel" />
          Cancel Order
        </MenuItem>







      </CustomPopover>

      <Dialog 
        open={openDialogBox}
        sx={{
          '& .MuiDialog-paper': { 
            width: '50%', // Increase to 90% for a wider dialog
            maxWidth: 'none', // Optional: Remove the maximum width constraint
            maxHeight: '90vh', // Keeping the max height as before
          },
        }}
      >
        <DialogTitle align='center'>
          {`# LO-32452`}
        </DialogTitle>

        {/* <DialogContent>
          <Typography sx={{ mb: 3 }}>Please find details of your appointment below</Typography>
        </DialogContent> */}

        <DialogContent>
          <Stack
            spacing={2}
            component={Paper}
            variant="outlined"
            sx={{
              p: 2.5,
              minWidth: 300,
              flexShrink: 0,
              borderRadius: 5,
              typography: 'body1',
              borderStyle: 'dashed',
            }}
          >
            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Patient Name</Box>
              {row.patient}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Patient Phone Number</Box>
              {row.patientPhone}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Patient Email</Box>
              {row.patientEmail}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Gender</Box>
              {row.gender}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Order Type</Box>
              {row.orderType}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Ordered By</Box>
              {row.doctor}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Doctor Phone Number</Box>
              {row.doctorPhone}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Doctor Email</Box>
              {row.doctorEmail}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Request Date</Box>
              {row.reqDate}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />

            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Priority</Box>
              {row.priority}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />


            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Fee Paid</Box>
              {row.fee}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 1, borderColor: 'primary.main' }} />


            <Stack spacing={0.5}>
              <Box sx={{ color: 'text.disabled' }}>Message</Box>
              {row.message}
            </Stack>

          </Stack>
        </DialogContent>


        <DialogActions>
          <Button  onClick={dialog.onTrue} variant="outlined" color="inherit">
            {row.status === 'Awaiting Confirmation'? 'Schedule':'Reschedule'}
          </Button>

          <Button onClick={() => setOpenDialogBox(false)} variant="outlined" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
          open={dialog.value} 
          onClose={dialog.onFalse}
          sx={{
            '& .MuiDialog-paper': {
              width: '40%', // Adjust this value to change the width of the dialog
              maxWidth: 'none', // Optional: This line removes the maximum width constraint
              // maxHeight: '90vh', // You can also adjust the max height if needed
            },
          }}
        >
        
        <DialogTitle align='center'>
          Set Appointment
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>Please fill the form below</Typography>

          <TextField
            autoFocus
            fullWidth
            type="date"
            margin="dense"
            variant="outlined"
            value={appointmentDateInput}
            onChange={(e) => setAppointmentDateInput(e.target.value)}
          />

          <TextField
            autoFocus
            fullWidth
            type="time"
            margin="dense"
            variant="outlined"
            value={appointmentTimeInput}
            onChange={(e) => setAppointmentTimeInput(e.target.value)}
          />

          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />


        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            Cancel
          </Button>
          <LoadingButton onClick={()=>alert("appointment")} variant="contained">
            Book Appointment
          </LoadingButton>
        </DialogActions>
      </Dialog>


    </>
  );
}

AppAppointmentTableRow.propTypes = {
  row: PropTypes.object,
};
