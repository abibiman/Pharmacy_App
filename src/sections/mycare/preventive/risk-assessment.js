import axios from 'axios';
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
// utils
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
  const [openDisplayModal, setOpenDisplayModal] = useState(false);
  const [riskData, setRiskData] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const NewJobSchema = Yup.object().shape({
    pregnancies: Yup.string().required('Number of Pregnancies is required'),
    glucose: Yup.string().required('Glucose is required'),
    gender: Yup.string().required('Gender is required'),
    bloodPressure: Yup.string().required('Blood Pressure diagnosed is required'),
    // skinThickness: Yup.string().required('Skin Thickness is required'),
    // insulin: Yup.string().required('Insulin is required'),
    bmi: Yup.string().required('BMI is required'),
    age: Yup.string().required('Age is required'),
    // diabetesPedigreeFunction: Yup.string().required('Diabetes Pedigree Function is required'),
    parentDiabetes: Yup.string().required('Parent Diabetes is required'),
    siblingDiabetes: Yup.string().required('Sibling Diabetes is required'),
    grandParentDiabetes: Yup.string().required('Grandparent Diabetes is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const genderWatch = watch('gender');

  const onSubmit = handleSubmit(async (data) => {
    console.info('DATA', data);
    const {
      pregnancies,
      age,
      bloodPressure,
      // skinThickness,
      // insulin,
      glucose,
      bmi,
      // diabetesPedigreeFunction,
      parentDiabetes,
      siblingDiabetes,
      grandParentDiabetes,
    } = data || {};
    const dataObject = {
      sample_patient: {
        Pregnancies: pregnancies,
        Glucose: glucose,
        BloodPressure: bloodPressure,
        // SkinThickness: skinThickness,
        // Insulin: insulin,
        BMI: bmi,
        // DiabetesPedigreeFunction: diabetesPedigreeFunction,
        Age: age,
      },
      diabetes_pedigree_data: {
        parent_diabetes: parentDiabetes,
        sibling_diabetes: siblingDiabetes,
        grandparent_diabetes: grandParentDiabetes,
      },
    };

    console.log(dataObject);
    try {
      const res = await customAxios.post('/predict', dataObject);
      console.log(res);
      // setRiskData(res.)
      // if (res) {
      //   const {
      //     data: { items },
      //   } = await axios.get(`https://abibiman-api.onrender.com/conditions/${user.userID}`, {
      //     headers: {
      //       Authorization: `Basic ${user?.token}`,
      //     },
      //   });
      //   setConditionsData(items);
      // }
      // reset();
      // onClose();
      if (res) {
        setOpenDisplayModal(true);
        onClose();
      }
      enqueueSnackbar('Create success!');
    } catch (error) {
      console.error(error);
    }
  });
  console.log(genderWatch);
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>Fill the form to add a new condition</DialogTitle>

      <Stack spacing={3} sx={{ px: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Condition Name</Typography>
            <RHFTextField name="conditionName" />
          </Stack>
          <br />
          <Stack spacing={2}>
            <Typography variant="subtitle2">Gender</Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  {[
                    {
                      label: 'Male',
                      icon: <Iconify icon="solar:clock-circle-bold" width={32} sx={{ mb: 2 }} />,
                    },
                    {
                      label: 'Female',
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
          <Stack spacing={2} sx={{ display: genderWatch === 'Male' ? 'none' : 'block' }}>
            <Typography variant="subtitle2">Pregnancies</Typography>
            <RHFTextField name="pregnancies" placeholder="Eg: Type 2" />
          </Stack>
          <br />

          <Stack spacing={2}>
            <Typography variant="subtitle2">Age</Typography>
            <RHFTextField name="age" />
          </Stack>

          <br />
          <Stack spacing={2}>
            <Typography variant="subtitle2">Glucose</Typography>
            <RHFTextField name="glucose" />
          </Stack>
          <br />
          <Stack spacing={2}>
            <Typography variant="subtitle2">Blood Pressure</Typography>
            <RHFTextField name="bloodPressure" />
          </Stack>
          <br />
          {/* <Stack spacing={2}>
            <Typography variant="subtitle2">Skin Thickness</Typography>
            <RHFTextField name="skinThickness" />
          </Stack>

          <br />

          <Stack spacing={2}>
            <Typography variant="subtitle2">Insulin</Typography>
            <RHFTextField name="insulin" />
          </Stack>

          <br /> */}

          <Stack spacing={2}>
            <Typography variant="subtitle2">BMI</Typography>
            <RHFTextField name="bmi" />
          </Stack>

          <br />

          {/* <Stack spacing={2}>
            <Typography variant="subtitle2">Diabetes Predigree Function</Typography>
            <RHFTextField name="diabetesPedigreeFunction" />
          </Stack>
          <br /> */}

          <Stack spacing={2}>
            <Typography variant="subtitle2">Parent Diabetes</Typography>
            <Controller
              name="parentDiabetes"
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

          <Stack spacing={2}>
            <Typography variant="subtitle2">Sibling Diabetes</Typography>
            <Controller
              name="siblingDiabetes"
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

          <Stack spacing={2}>
            <Typography variant="subtitle2">Grandparent Diabetes</Typography>
            <Controller
              name="grandParentDiabetes"
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
                Assess Risk
              </LoadingButton>
            </DialogActions>
          </Stack>
        </FormProvider>
      </Stack>

      <ConfirmDisplayDialog open={openDisplayModal} close={() => setOpenDisplayModal(false)} />
    </Dialog>
  );
}

ConfirmConditionDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  setConditionsData: PropTypes.func,
};

function ConfirmDisplayDialog({ open, close }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={close}>
      <DialogTitle>Fill the form to add a new condition</DialogTitle>

      <Stack spacing={1.5}>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

ConfirmDisplayDialog.propTypes = {
  close: PropTypes.func,
  open: PropTypes.bool,
};
