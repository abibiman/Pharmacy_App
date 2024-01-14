import PropTypes from 'prop-types';
// @mui
import { useState, useEffect,useContext } from 'react';

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



// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { firstName,lastName,email,phoneNumber, gender,age,photo,userID} = row;
  const { user } = useContext(AuthContext);

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
  },[data])

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={firstName} src={photo} sx={{ mr: 2 }} />

          <ListItemText
            primary={`${firstName} ${lastName}`}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{data.age?data.age:"N/A"}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{data.gender}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (data.healthStatus === 'Normal' && 'success') ||
              (data.healthStatus === 'Risky' && 'warning') ||
              (data.healthStatus === 'Emergency' && 'error') ||
              'default'
            }
          >
            {data.healthStatus}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {/* <Tooltip title="Quick View" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip> */}

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
          Schedule 
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          View Patient
        </MenuItem>


      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
