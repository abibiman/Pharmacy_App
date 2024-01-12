// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useForm, Controller } from 'react-hook-form';
// components
import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import { MenuItem, Dialog } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import { useState, useContext } from 'react';
import { useSettingsContext } from 'src/components/settings';
// Context
import { AuthContext } from 'src/auth/context/jwt';
// utils
import customAxios from 'src/utils/customAxios';
// components
import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ConditionList from './conditions/conditionList';

// ----------------------------------------------------------------------

export default function ManageConditions() {
  const settings = useSettingsContext();
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);

  const [conditionsData, setConditionsData] = useState([]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Condition Management"
        links={[
          { name: 'Dashboard', href: '#' },
          {
            name: 'My Care',
            href: '/dashboard/my-care',
          },
          { name: 'Condition Managment' },
        ]}
        action={
          <Button
            size="large"
            color="inherit"
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Add Condition
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <br />
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <ConditionList
            title="Listed Conditions"
            tableLabels={[
              { id: 'description', label: 'Condition' },
              { id: 'date', label: 'Year Diagnosed' },
              { id: 'amount', label: 'On Medication' },
              { id: 'status', label: 'Medication' },
              { id: '' },
            ]}
            conditionsData={conditionsData}
            setConditionsData={setConditionsData}
          />
        </Stack>

        <ConfirmConditionDialog
          open={openModal}
          onClose={handleClose}
          setConditionsData={setConditionsData}
        />
      </Card>
    </Container>
  );
}

function ConfirmConditionDialog({ open, onClose, setConditionsData }) {
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const medicationTypeArray = ['Herbal', 'Foreign', 'None'];

  const NewJobSchema = Yup.object().shape({
    conditionName: Yup.string().required('Condition name is required'),
    conditionType: Yup.string().required('Condition type is required'),
    yearDiagnosed: Yup.string().required('Year diagnosed is required'),
    onMedication: Yup.string().required('On-medication is required'),
    medicationType: Yup.string().required('Medical type is required'),
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
    const { conditionName, conditionType, yearDiagnosed, onMedication, medicationType } =
      data || {};
    const dataObject = {
      userID: user.userID,
      name: conditionName,
      year: yearDiagnosed,
      type: conditionType,
      onMedication: onMedication === 'Yes',
      medications: [],
      treatmentPlan: [],
      medicationType,
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
      enqueueSnackbar('Created successfully!');
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

          <RHFTextField
            fullWidth
            select
            defaultValue="Herbal"
            // helperText="Please select your medication type"
            name="medicationType"
          >
            {medicationTypeArray.map((option) => (
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
