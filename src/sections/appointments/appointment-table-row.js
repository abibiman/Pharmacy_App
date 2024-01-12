import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

// @mui
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
import { AuthContext } from 'src/auth/context/jwt';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import customAxios from 'src/utils/customAxios';

// ----------------------------------------------------------------------

export default function AppointmentTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  setTableData,
}) {
  const {
    appointmentType,
    appointmentDate,
    providerName,
    status,
    photo,
    providerCategory,
    id,
    patientName,
    meetingLink,
  } = row;

  // useState
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openDialogBox, setOpenDialogBox] = useState(false);

  // useContext
  const { user } = useContext(AuthContext);
  const { token, userID } = user;

  const dateTime = new Date(appointmentDate);
  const currentDate = new Date();

  // Extract date components
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // Extract time components
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();
  const seconds = dateTime.getUTCSeconds();

  // const currentHours = dateTime.getUTCHours();
  // const currentMinutes = dateTime.getUTCMinutes();
  // const currentSeconds = dateTime.getUTCSeconds();

  const date = `${year}-${month}-${day}`;
  const time = `${hours}:${minutes}:${seconds}`;

  const presentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  // const presentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

  const confirm = useBoolean();

  const popover = usePopover();

  // const handleClickAppointment = () => {
  //   if (status === 'approved' && presentDate === date) {
  //     disabled(false);
  //   }
  // };

  const getAllUserAppointments = async () => {
    try {
      const {
        data: { data },
      } = await customAxios.get(`/appointments/user/${userID}`);

      setTableData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelAppointment = async () => {
    try {
      await customAxios.patch(`/appointments/cancel/${id}`, {
        active: false,
        status: 'Pending',
      });
      getAllUserAppointments();
      setOpenPopUp(false);
      popover.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{ display: status === 'cancelled' ? 'none' : 'table-row' }}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={providerName} sx={{ mr: 2 }} src={photo} />
          {/* {providerName}
          </Avatar> */}

          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {providerName}
              </Typography>
            }
            secondary={
              <Link
                noWrap
                variant="body2"
                onClick={onViewRow}
                sx={{ color: 'text.disabled', cursor: 'pointer', textTransform: 'capitalize' }}
              >
                {providerCategory}
              </Link>
            }
          />
        </TableCell>

        <TableCell>{date}</TableCell>
        <TableCell>{time}</TableCell>

        <TableCell>{appointmentType}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'pending' && 'warning') ||
              (status === 'cancelled' && 'error') ||
              'success'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell>
          <Button
            disabled={!(status === 'approved' && presentDate === date)}
            // disabled={!(presentDate === date)}
            variant="contained"
            sx={{
              '&.Mui-disabled': {
                background: '#eaeaea',
                color: '#c0c0c0',
                cursor: 'pointer',
              },
            }}
            target="_blank"
            href={meetingLink}
          >
            Join
          </Button>
        </TableCell>

        <TableCell align="right" sx={{ px: 1 }}>
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
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
            setOpenPopUp(true);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Cancel
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        title="Cancel"
        content="Are you sure want to cancel?"
        action={
          <Button variant="contained" color="error" onClick={handleCancelAppointment}>
            Yes
          </Button>
        }
      />

      <Dialog open={openDialogBox}>
        <DialogTitle>
          Hello {patientName}, you have An Appointment with {providerName}
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>Please find details of your appointment below</Typography>
        </DialogContent>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>Appointment Date : {date} </Typography>
          <Typography sx={{ mb: 3 }}>Appointment Time : {time}</Typography>
          <Typography sx={{ mb: 3 }}>Appointment Type : {appointmentType}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialogBox(false)} variant="outlined" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AppointmentTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  setTableData: PropTypes.func,
};
