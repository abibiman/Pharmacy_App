import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// theme

// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import Paper from '@mui/material/Paper';
import { useForm, Controller } from 'react-hook-form';
// components
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import { useSettingsContext } from 'src/components/settings';
// Context
import { AuthContext } from 'src/auth/context/jwt';
import customAxios from 'src/utils/customAxios';
// components
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RiskAssessment({ sx, ...other }) {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);

  return (
    <Stack
      alignItems="center"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette.primary.light, 0.2),
          endColor: alpha(theme.palette.primary.main, 0.2),
        }),
        p: 5,
        borderRadius: 2,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Button
        size="large"
        color="inherit"
        variant="contained"
        onClick={() => setOpenModal(true)}
        sx={{
          mt: 5,
          mb: 2,
          color: 'common.white',
          bgcolor: 'grey.800',
          '&:hover': {
            bgcolor: 'grey.700',
          },
        }}
      >
        Assess Health Risk
      </Button>
      <Typography variant="caption" sx={{ color: 'primary.dark', textAlign: 'center' }}>
        Check Diabetes/High Blood Pressure Risk Score
      </Typography>

      <ConfirmConditionDialog
        open={openModal}
        onClose={handleClose}
        // setConditionsData={setConditionsData}
      />
    </Stack>
  );
}

RiskAssessment.propTypes = {
  sx: PropTypes.object,
};

function ConfirmConditionDialog({ open, onClose, setConditionsData }) {
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const NewJobSchema = Yup.object().shape({
    conditionName: Yup.string().required('Condition name is required'),
    conditionType: Yup.string().required('Condition type is required'),
    yearDiagnosed: Yup.string().required('Year diagnosed is required'),
    onMedication: Yup.string().required('On-medication is required'),
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
    console.info('DATA', data);
    const { conditionName, conditionType, yearDiagnosed, onMedication } = data || {};
    const dataObject = {
      userID: user.userID,
      name: conditionName,
      year: yearDiagnosed,
      type: conditionType,
      onMedication: onMedication === 'Yes',
      medications: [],
      treatmentPlan: [],
    };
    try {
      const res = await customAxios.post('/conditions', dataObject);

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
      <DialogTitle>Fill the form to add a new condition</DialogTitle>

      <Stack spacing={3} sx={{ px: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Condition Name</Typography>
            <RHFTextField name="conditionName" placeholder="Eg: Diabetes" />
          </Stack>
          <br />

          <Stack spacing={2}>
            <Typography variant="subtitle2">Condition Type</Typography>
            <RHFTextField name="conditionType" placeholder="Eg: Type 2" />
          </Stack>
          <br />

          <Stack spacing={2}>
            <Typography variant="subtitle2">Year Diagnosed</Typography>
            <RHFTextField name="yearDiagnosed" placeholder="Eg: 2020" />
          </Stack>
          <br />

          <Stack spacing={2}>
            <Typography variant="subtitle2">On Medication?</Typography>
            <Controller
              name="onMedication"
              control={control}
              render={({ field }) => (
                <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  {[
                    {
                      label: 'Yes',
                      icon: <Iconify icon="solar:clock-circle-bold" width={32} sx={{ mb: 2 }} />,
                    },
                    {
                      label: 'No',
                      icon: <Iconify icon="solar:wad-of-money-bold" width={32} sx={{ mb: 2 }} />,
                    },
                  ].map((item) => (
                    <Paper
                      component={ButtonBase}
                      variant="outlined"
                      key={item.label}
                      onClick={() => field.onChange(item.label)}
                      sx={{
                        p: 2.5,
                        borderRadius: 1,
                        typography: 'subtitle2',
                        flexDirection: 'column',
                        ...(item.label === field.value && {
                          borderWidth: 2,
                          borderColor: 'text.primary',
                        }),
                      }}
                    >
                      {item.label}
                    </Paper>
                  ))}
                </Box>
              )}
            />
          </Stack>
          <br />

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
                Add Condition
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
};
