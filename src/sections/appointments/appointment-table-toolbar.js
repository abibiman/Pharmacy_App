import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function AppointmentTableToolbar({
  filters,
  onFilters,
  //
  dateError,
  appointmentOptions,
  status,
}) {
  const popover = usePopover();

  // const handleFilterName = useCallback(
  //   (event) => {
  //     onFilters('name', event.target.value);
  //   },
  //   [onFilters]
  // );

  const handleFilterAppointments = useCallback(
    (event) => {
      onFilters(
        'defaultValues',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterStatus = useCallback(
    (event) => {
      onFilters(
        'status',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onFilters('startDate', newValue);
    },
    [onFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onFilters('endDate', newValue);
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 180 },
          }}
        >
          <InputLabel>Appointment Type</InputLabel>

          <Select
            multiple
            value={filters.defaultValues}
            onChange={handleFilterAppointments}
            input={<OutlinedInput label="Appointment Type" />}
            // renderValue={(selected) => selected.map((value) => value).join(', ')}
            renderValue={(selected) =>
              selected.map((value, index) => (
                <span key={index}>
                  {value}
                  {index < selected.length - 1 ? ', ' : ''}
                </span>
              ))
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {appointmentOptions.map((option, key) => (
              <MenuItem key={key} value={option}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.defaultValues.includes(option)}
                />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 180 },
          }}
        >
          <InputLabel>Status</InputLabel>

          <Select
            multiple
            value={filters.status}
            onChange={handleFilterStatus}
            input={<OutlinedInput label="Status" />}
            // renderValue={(selected) => selected.map((value) => value).join(', ')}
            renderValue={(selected) =>
              selected.map((value, index) => (
                <span key={index}>
                  {value}
                  {index < selected.length - 1 ? ', ' : ''}
                </span>
              ))
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {status.map((option, key) => (
              <MenuItem key={key} value={option} sx={{ textTransform: 'capitalize' }}>
                <Checkbox disableRipple size="small" checked={filters.status.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <DatePicker
          label="Start date"
          value={filters.startDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{
            maxWidth: { md: 180 },
          }}
        />

        <DatePicker
          label="End date"
          value={filters.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
            },
          }}
          sx={{
            maxWidth: { md: 180 },
          }}
        /> */}

        {/* <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.name}
            onChange={handleFilterName}
            placeholder="Search customer or invoice number..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack> */}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}

AppointmentTableToolbar.propTypes = {
  dateError: PropTypes.bool,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  appointmentOptions: PropTypes.array,
  status: PropTypes.array,
};
