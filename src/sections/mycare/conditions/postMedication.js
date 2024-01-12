// Context
import { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// components
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import { TextField, MenuItem } from '@mui/material';

import { AuthContext } from 'src/auth/context/jwt';

// import moment from 'moment';

// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import customAxios from 'src/utils/customAxios';

export function ConfirmConditionDialog({ open, onClose, setConditionsData, conditionID }) {
  const { user } = useContext(AuthContext);
  const statusType = ['Finished', 'In-Progress', 'Not Started'];

  const { enqueueSnackbar } = useSnackbar();
  const NewJobSchema = Yup.object().shape({
    // conditionName: Yup.string().required('Condition name is required'),
    // conditionType: Yup.string().required('Condition type is required'),
    // yearDiagnosed: Yup.string().required('Year diagnosed is required'),
    // onMedication: Yup.string().required('On-medication is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // console.info('DATA', data);
    const { medication, dailyDosage, dateStarted, dateEnded } = data || {};

    // const startDate = moment(dateStarted).format('Do MMMM YYYY');
    // const endDate = moment(dateEnded).format('Do MMMM YYYY');

    const dataObject = {
      id: conditionID,
      medication,
      dosage: dailyDosage,
      dateStarted,
      dateEnded,
      status: 'pending',
    };
    try {
      const res = await customAxios.patch('/conditions/updatemedicationlist', dataObject);
      if (res) {
        const {
          data: { items },
        } = await customAxios.get(`/conditions/${user.userID}`);
        setConditionsData(items);
      }

      reset();
      onClose();
      enqueueSnackbar('Create success!');
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>Post a medication</DialogTitle>

      <Stack spacing={3} sx={{ px: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Medication</Typography>
            <RHFTextField name="medication" />
          </Stack>
          <br />

          <Stack spacing={2}>
            <Typography variant="subtitle2">Daily Dosage</Typography>
            <RHFTextField name="dailyDosage" />
          </Stack>
          <br />

          <Stack spacing={2}>
            <Typography variant="subtitle2">Date Started</Typography>
            <RHFTextField name="dateStarted" type="date" />
          </Stack>
          <br />

          <Stack spacing={2}>
            <Typography variant="subtitle2">Date Ended</Typography>
            <RHFTextField name="dateEnded" type="date" />
          </Stack>
          <br />

          <RHFTextField
            fullWidth
            select
            defaultValue="Audio"
            helperText="Please select the status of your medication"
            name="status"
          >
            {statusType.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </RHFTextField>

          <Stack spacing={1.5}>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{ ml: 2 }}
              >
                Add Medication
              </LoadingButton>
            </DialogActions>
          </Stack>
        </FormProvider>
      </Stack>
    </Dialog>
  );
}

ConfirmConditionDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  setConditionsData: PropTypes.func,
  conditionID: PropTypes.string,
};
