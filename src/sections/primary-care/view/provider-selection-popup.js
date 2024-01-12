import { useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Typography, Stack, Dialog, Box, Button } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import { AuthContext } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export default function ProviderSelectionPopup({ open, data, close }) {
  const { user } = useContext(AuthContext) || {};
  const { enqueueSnackbar } = useSnackbar();

  const selectProvider = async () => {
    try {
      const { data: resData } = await axios.post(
        `https://abibiman-api.onrender.com/primarycare`,
        { userID: user?.userID, providerID: data },
        {
          headers: {
            Authorization: `Basic ${user?.token}`,
          },
        }
      );
      enqueueSnackbar('Provider successfully selected');
      close();
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onClose={close}>
      <Stack
        sx={{
          padding: '40px 20px 20px',
          '@media (max-width: 425px )': {
            padding: '20px 10px',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Typography>
          Would you like to select {data.title} {data.firstName} {data.lastName} as your primary
          care provider?
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0',
            gap: '10px',
          }}
        >
          <Button
            href="#"
            variant="contained"
            onClick={selectProvider}
            sx={{
              '@media (max-width: 425px )': {
                width: '100%',
              },
              // background: `${theme.palette.primary.main}`,
            }}
          >
            Yes
          </Button>

          <Button
            href="#"
            variant="contained"
            onClick={() => close()}
            sx={{
              '@media (max-width: 425px )': {
                width: '100%',
              },
              // background: `${theme.palette.primary.main}`,
            }}
          >
            No{' '}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
}

ProviderSelectionPopup.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  data: PropTypes.object,
};
