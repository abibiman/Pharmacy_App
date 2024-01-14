import PropTypes from 'prop-types';
// @mui
import { useState, useCallback, useEffect,useContext } from 'react';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
//
import axios from 'axios'
import UserQuickEditForm from './user-quick-edit-form';
import { AuthContext } from 'src/auth/context/jwt';
import { useNavigate} from 'react-router'
import { useSnackbar } from 'src/components/snackbar';


// ----------------------------------------------------------------------

export default function AppointmentTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { photo,userID} = row;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const [data,setData] = useState({})

  useEffect(() => {
    axios.get(`https://abibiman-api.onrender.com/users/${userID}`, {
      headers: {
        Authorization: `Basic ${user?.token}`,
      },
    })
    .then(res => {
      setData(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])


  const approveRequest = async () => {
    const body = {
      id: row.id,
      providerID: row.providerID,
      userID: row.userID,
      user: row.user,
    };
  
    try {
      const response = await axios.patch(
        'https://abibiman-api.onrender.com/primarycare/provider/approverequest',
        body,
        {
          headers: {
            Authorization: `Basic ${user?.token}`,
          },
        }
      );

      console.log(response.data)
      enqueueSnackbar('Approval Success!');
      enqueueSnackbar('Congrats On Your New Patient!');
  
      // Handle the successful response here
      navigate(`/dashboard/my-patients`)
    } catch (error) {
      // Handle errors here
      console.error('Error approving request:', error.message);
    }
  };

  const denyRequest = async () => {
    const body = {
      id: row.id,
      providerID: row.providerID,
      userID: row.userID,
      user: row.user,
    };
  
    try {
      const response = await axios.patch(
        'https://abibiman-api.onrender.com/primarycare/provider/denyrequest',
        body,
        {
          headers: {
            Authorization: `Basic ${user?.token}`,
          },
        }
      );
  
      // Handle the successful response here
      console.log('Request Denied:', response.data);
      enqueueSnackbar('Patient Request Denied!');
    } catch (error) {
      // Handle errors here
      console.error('Error approving request:', error.message);
    }
  };


  const confirm = useBoolean();
  const reject = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={row.user} src={photo} sx={{ mr: 2 }} />

          <ListItemText
            primary={`${row.user}`}
            secondary=""
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>



        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.age}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.gender}</TableCell>



        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>


          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}

        >
          <Iconify icon="icon-park:success" />
          Approve 
        </MenuItem>

        <MenuItem
          onClick={() => {
            reject.onTrue();
            popover.onClose();
          }}

        >
          <Iconify icon="flat-color-icons:cancel" />
          Reject 
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Approve Request"
        content="Are you sure want to?"
        action={
          <Button variant="contained" color="success" onClick={approveRequest}>
            Approve
          </Button>
        }
      />

<ConfirmDialog
        open={reject.value}
        onClose={reject.onFalse}
        title="Reject"
        content="Are you sure want to ?"
        action={
          <Button variant="contained" color="error" onClick={denyRequest}>
            Deny
          </Button>
        }
      />
    </>
  );
}

AppointmentTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
