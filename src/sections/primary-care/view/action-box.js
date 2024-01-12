import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import { Box, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';
// import Iconify from 'src/components/iconify';

export default function ActionBox({ actionBox, data, dialog }) {
  const theme = useTheme();
  const openAppointmentDialog = () => {
    actionBox.onFalse();
    dialog.onTrue();
  };

  return (
    <Dialog
      open={actionBox.value}
      onClose={actionBox.onFalse}
      sx={{
        maxWidth: '400px',
        margin: '0 auto',
        '@media (max-width: 425px )': {
          maxWidth: '100%',
        },
      }}
    >
      <Stack
        sx={{
          padding: '20px 20px 10px',
          '@media (max-width: 425px )': {
            padding: '20px 10px',
          },
        }}
      >
        <Typography>
          Would you like to book an appointment with {data.title} {data.firstName} {data.lastName}?
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0',
          }}
        >
          <Button
            component={RouterLink}
            href="#"
            variant="contained"
            onClick={openAppointmentDialog}
            sx={{
              '@media (max-width: 425px )': {
                width: '100%',
              },
              background: `${theme.palette.primary.main}`,
            }}
          >
            Book Appointment
          </Button>
        </Box>
      </Stack>

      {/* <Stack
        sx={{
          padding: '20px 20px 10px',
          '@media (max-width: 425px )': {
            padding: '20px 10px',
          },
        }}
      >
        <Typography>Would you like to change your primary care provider?</Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0',
          }}
        >
          <Button
            component={RouterLink}
            href="/dashboard/primary-care/list"
            variant="contained"
            sx={{
              '@media (max-width: 425px )': {
                width: '100%',
              },
              background: `${theme.palette.primary.main}`,
            }}
          >
            Change Provider
          </Button>
        </Box>
      </Stack> */}
    </Dialog>
  );
}

ActionBox.propTypes = {
  actionBox: PropTypes.bool,
  data: PropTypes.array,
  dialog: PropTypes.bool,
};
