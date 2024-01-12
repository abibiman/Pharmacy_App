import { Typography, Stack, Box, Paper, Container, Button } from '@mui/material';
import PrimaryCareImage from '../../../assets/images/primary-care-min.png';
// ----------------------------------------------------------------------

export default function PrimaryCareIntro() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        height: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          // width: '100vw',
          // height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          maxWidth: '700px !important',
          borderRadius: '20px',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 15px',

          '@media (max-width: 700px)': {
            maxWidth: '100%',
            padding: '25px',
          },
        }}
      >
        <Typography
          variant="h4"
          paragraph
          sx={{
            maxWidth: '70%',
            marginTop: '40px',
            '@media (max-width: 700px)': {
              maxWidth: '100%',
            },
          }}
        >
          Select a Doctor for Your Best Healthcare Experience
        </Typography>
        <Box sx={{ my: 3 }}>
          <img
            src={PrimaryCareImage}
            alt="Select Doctor"
            style={{
              width: '250px',
              maxWidth: '100%',
              display: 'block',
              margin: 'auto',
            }}
          />
        </Box>
        <Typography
          variant="body1"
          paragraph
          sx={{
            maxWidth: '70%',
            '@media (max-width: 700px)': {
              maxWidth: '100%',
            },
          }}
        >
          Selecting a doctor allows you to enjoy personalized care and manage your health more
          effectively. Click the button below to choose a doctor now.
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
          <Button variant="contained" color="primary" href="/dashboard/primary-care/list">
            Select a Provider
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
