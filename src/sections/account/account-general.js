import * as Yup from 'yup';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// hooks
import { AuthContext } from 'src/auth/context/jwt';
// utils
import { fData } from 'src/utils/format-number';
// assets
import { countries } from 'src/assets/data';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';

import { getOneUser } from './helpers/request';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({});

  const { user } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const {
        data: { data },
      } = await getOneUser(user?.userID, user?.token);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('firstName is required'),
    lastName: Yup.string().required('lastName is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // photoURL: Yup.mixed().nullable().required('Avatar is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    // country: Yup.string().required('Country is required'),
    // address: Yup.string().required('Address is required'),
    // region: Yup.string().required('Region is required'),
    // city: Yup.string().required('City is required'),
    // ethnicity: Yup.string().required('Ethnicity is required'),
    age: Yup.string().required('Age is required'),
    height: Yup.string().required('Height is required'),
    weight: Yup.string().required('Weight is required'),
    // about: Yup.string().required('About is required'),
    // not required
    isPublic: Yup.boolean(),
  });

  const defaultValues = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email || '',
    photoURL: userData?.photo || null,
    phoneNumber: userData?.phoneNumber || '',
    country: userData.address?.country || '',
    city: userData.address?.city || '',
    address: userData.address?.ghanaPostId || '',
    region: userData.address?.region || '',
    ethnicity: userData?.ethnicity || '',
    age: userData?.age || '',
    weight: userData?.weight || '',
    height: userData?.height || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  useEffect(() => {
    if (userData) {
      setValue('firstName', userData?.firstName);
      setValue('lastName', userData?.lastName);
      setValue('email', userData?.email);
      setValue('photoURL', userData?.photo);
      setValue('phoneNumber', userData?.phoneNumber);
      setValue('country', userData.address?.country);
      setValue('address', userData.address?.ghanaPostId);
      setValue('region', userData.address?.region);
      setValue('city', userData.address?.City);
      setValue('ethnicity', userData?.ethnicity);
      setValue('age', userData?.age);
      setValue('weight', userData?.weight);
      setValue('height', userData?.height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, setValue]);

  const onSubmit = handleSubmit(async (rhfdata) => {
    try {
      const {
        firstName,
        lastName,
        email,
        photoURL,
        phoneNumber,
        country,
        address,
        region,
        ethnicity,
        age,
        weight,
        height,
        city,
      } = rhfdata;

      const dataObject = {
        firstName,
        lastName,
        age,
        address: {
          City: city,
          region,
          ghanaPostId: address,
          Country: country,
        },
        ethnicity,
        weight,
        height,
        email,
        phoneNumber,
      };

      await axios.patch(`https://abibiman-api.onrender.com/users/${user?.userID}`, dataObject, {
        headers: {
          Authorization: `Basic ${user?.token}`,
        },
      });

      if (photoURL !== userData?.photo) {
        const formData = new FormData();
        formData.append('image', photoURL);

        await axios.patch(
          `https://abibiman-api.onrender.com/imageupload/user/${user?.userID}`,
          formData,
          {
            headers: {
              Authorization: `Basic ${user?.token}`,
            },
          }
        );
      }

      getUser();
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', file);
      }
    },
    [setValue]
  );

  const displayNameValue = watch('firstName');

  return (
    <>
      {!userData && displayNameValue === undefined ? (
        <LoadingScreen />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
                <RHFUploadAvatar
                  name="photoURL"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />

                <RHFSwitch
                  name="isPublic"
                  labelPlacement="start"
                  label="Public Profile"
                  sx={{ mt: 5 }}
                />
              </Card>
            </Grid>

            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField
                    name="firstName"
                    label="Firstname"
                    InputLabelProps={{ shrink: true }}
                  />
                  <RHFTextField
                    name="lastName"
                    label="Lastname"
                    InputLabelProps={{ shrink: true }}
                  />
                  <RHFTextField name="age" label="Age" InputLabelProps={{ shrink: true }} />
                  <RHFTextField name="weight" label="Weight" InputLabelProps={{ shrink: true }} />
                  <RHFTextField name="height" label="Height" InputLabelProps={{ shrink: true }} />
                  <RHFTextField
                    name="email"
                    label="Email Address"
                    InputLabelProps={{ shrink: true }}
                  />
                  <RHFTextField
                    name="phoneNumber"
                    label="Phone Number"
                    InputLabelProps={{ shrink: true }}
                  />
                  <RHFTextField name="address" label="Address" InputLabelProps={{ shrink: true }} />

                  <RHFAutocomplete
                    name="country"
                    label="Country"
                    options={countries.map((country) => country.label)}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => {
                      const { code, label, phone } = countries.filter(
                        (country) => country.label === option
                      )[0];

                      if (!label) {
                        return null;
                      }

                      return (
                        <li {...props} key={label}>
                          <Iconify
                            key={label}
                            icon={`circle-flags:${code.toLowerCase()}`}
                            width={28}
                            sx={{ mr: 1 }}
                          />
                          {label} ({code}) +{phone}
                        </li>
                      );
                    }}
                  />

                  <RHFTextField name="region" label="State/Region" />
                  <RHFTextField name="city" label="City" />
                </Box>

                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <RHFTextField name="about" multiline rows={4} label="About" />

                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Save Changes
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </>
  );
}
