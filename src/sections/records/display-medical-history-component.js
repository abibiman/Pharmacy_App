import { Container, Typography, Stack, Box, Button } from '@mui/material';
import Iconify from 'src/components/iconify';

export default function DisplayMedicalHistory() {
  return (
    <Container>
      <Stack
        sx={{
          margin: '50px 0',
          height: 'auto',
          borderRadius: '10px',
          padding: '15px',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', fontSize: '16px !important' }}
        >
          Patients Medical History
        </Typography>
        <Stack sx={{ width: '100%', margin: '15px', fontSize: '14px' }}>
          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row !important',
            }}
          >
            <Box sx={{ margin: '15px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="tabler:circle-check-filled" />
                <Typography variant="p" sx={{ ml: '5px' }}>
                  Allergies:
                </Typography>
              </Box>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Rice
              </Button>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Tomatoes
              </Button>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Milk
              </Button>
            </Box>

            <Box sx={{ margin: '15px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="tabler:circle-check-filled" />
                <Typography variant="p" sx={{ ml: '5px' }}>
                  Alcohol Consumption:
                </Typography>
              </Box>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                0 drinks per week
              </Button>
            </Box>

            <Box sx={{ margin: '15px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="tabler:circle-check-filled" />
                <Typography variant="p" sx={{ ml: '5px' }}>
                  Exercise Habits:
                </Typography>
              </Box>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                3 hours per week
              </Button>
            </Box>
          </Stack>
        </Stack>

        <Stack sx={{ width: '100%', margin: '15px', fontSize: '14px' }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: 'left', fontSize: '15px !important' }}
          >
            Family History
          </Typography>
          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row !important',
            }}
          >
            <Box sx={{ margin: '15px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="tabler:circle-check-filled" />
                <Typography variant="p" sx={{ ml: '5px' }}>
                  Any Chronic Disease in Family?
                </Typography>
              </Box>
              <Button variant="outlined" color="success" sx={{ mt: '5px' }}>
                No
              </Button>
            </Box>

            <Box sx={{ margin: '15px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="tabler:circle-check-filled" />
                <Typography variant="p" sx={{ ml: '5px' }}>
                  List of Diseases:
                </Typography>
              </Box>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Cold
              </Button>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Malaria
              </Button>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Cholera
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
