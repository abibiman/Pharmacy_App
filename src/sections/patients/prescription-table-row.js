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

export default function PrescriptionTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { userID, providerID,orderedBy,category,pharmacy,type,dateOrdered,dateExpected,status,dossagePerDay,hourIntervals,meals} = row;
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

          <ListItemText
            primary={type}
            secondary={category}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{orderedBy}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{pharmacy}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{dossagePerDay}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{meals}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{`${hourIntervals} Hours`}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{dateOrdered}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{dateExpected}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'Completed' && 'success') ||
              (status === 'Processing' && 'warning') ||
              (status === 'Cancelled' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        {/* <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {status=="Completed"?<Tooltip title="Download" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={()=> alert("Document Downloaded")}>
              <Iconify icon="solar:download-bold" />
            </IconButton>
          </Tooltip>:<a></a>}

           <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> 
        </TableCell>  */}
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
          <Iconify icon="solar:calendar-bold" />
          Schedule 
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
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

PrescriptionTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
