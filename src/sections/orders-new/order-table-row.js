import PropTypes from 'prop-types';
import { useState } from 'react';
import { format } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import PricePopup from './view/price-popup';

// ----------------------------------------------------------------------

export default function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const {id,price, providerID, userID, patient, patientContact, patientEmail, providerTitle, providerName, facilityID, datePrescribed, statusDescription, pharmacy, medications,orderNumber,status } = row;

  const confirm = useBoolean();

  const [priceDialog, setPriceDialog] = useState(false);


  

  const collapse = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        #-{orderNumber}
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={patient} src={patient} sx={{ mr: 2 }} />

        <ListItemText
          primary={patient}
          secondary={patientContact}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>



      <TableCell>
        
        <ListItemText
          primary={`${providerTitle} ${providerName}`}
          secondary="+23334352547"
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <Box
          onClick={onViewRow}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {datePrescribed}
        </Box>
      </TableCell>



      <TableCell>
        <Label
          variant="soft"
          color={

            (!price   && 'error') ||
            'default'
          }
        >
          {price?price:'Price Pending'}
        </Label>
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === 'completed' && 'success') ||
            (status === 'pending' && 'warning') ||
            (status === 'cancelled' && 'error') ||
            'default'
          }
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{
            ...(collapse.value && {
              bgcolor: 'action.hover',
            }),
          }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Stack component={Paper} sx={{ m: 1.5 }}>
          {(medications || []).map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  },
                }}
              >
                {/* <Avatar
                  src={item.coverUrl}
                  variant="rounded"
                  sx={{ width: 48, height: 48, mr: 2 }}
                /> */}

                <ListItemText
                  primary={item.drug}
                  secondary={item.form}
                  primaryTypographyProps={{
                    typography: 'body2',
                  }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />

                <Box>x{5}</Box>

                <Box sx={{ width: 110, textAlign: 'right' }}>{item.price?`GH₵ ${item.price}`:
                        <Label
                        variant="soft"
                        color={
                          (item.price && 'primary') ||
                          'default'
                        }
                      >
                        {item.price?item.price:'Price N/A'}
                      </Label>
                }</Box>
              </Stack>
            ))}
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <PricePopup
                      referralDialog={priceDialog}
                      handleClose={() => setPriceDialog(false)}
                      data={row}
                    />

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
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="icons8:cancel" />
          Cancel Order
        </MenuItem>

        <MenuItem
          onClick={() => {
            setPriceDialog(true)
            popover.onClose();
          }}
        > 
          <Iconify icon="tdesign:money" />
          Set Price
        </MenuItem>

        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        > 
          <Iconify icon="solar:eye-bold" />
          View Order
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

OrderTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
