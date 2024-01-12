import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';

// routes
import { paths } from 'src/routes/paths';
import { useSearchParams } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

// components
import Iconify from 'src/components/iconify';
import FormProvider from 'src/components/hook-form';
import customAxios from 'src/utils/customAxios';

// ----------------------------------------------------------------------

export default function JWTResetPasswordView() {
  const searchParams = useSearchParams();

  const emailParamData = searchParams.get('email');
  const authorizationParamData = searchParams.get('authorization');

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Password confirmation is required'),
  });

  const defaultValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [resetSuccess, setResetSuccess] = useState(false);
  const onSubmit = async (data) => {
    setResetSuccess(false);

    const requestData = {
      email: emailParamData,
      confirmPassword,
      newPassword,
    };
    try {
      const resData = await customAxios.post('/users/user-reset-password', requestData, {
        headers: {
          authorization: authorizationParamData,
        },
      });
      setResetSuccess(true);
      setConfirmPassword('');
      setNewPassword('');
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <TextField
        autoFocus
        fullWidth
        type="text"
        margin="dense"
        variant="outlined"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <TextField
        autoFocus
        fullWidth
        type="email"
        margin="dense"
        variant="outlined"
        label="Email Address"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <LoadingButton
        fullWidth
        size="large"
        // type="submit"
        variant="contained"
        // loading={isSubmitting}
        onClick={onSubmit}
      >
        Reset my password
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Typography variant="h3">Reset your password</Typography>
    </Stack>
  );

  const renderSuccessMessage = (
    <>
      {/* <PasswordIcon sx={{ height: 96 }} /> */}

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Successful password reset</Typography>

        <Typography variant="body5" sx={{ color: 'text.secondary' }}>
          You can now login to your account with your new password.
        </Typography>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          href={paths.auth.jwt.login}
          sx={{ marginTop: '15px' }}
        >
          Login
        </LoadingButton>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods}>
      {/* {renderHead} */}
      {resetSuccess ? (
        renderSuccessMessage
      ) : (
        <>
          {renderHead}
          {renderForm}
        </>
      )}
    </FormProvider>
  );
}
