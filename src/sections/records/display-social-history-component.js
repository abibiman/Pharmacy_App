// DisplaySocialHistory.js

import { Container, Typography, Stack, Box, Button } from '@mui/material';
import Iconify from 'src/components/iconify';

export default function DisplaySocialHistory() {
  return (
    <Container>
      <Stack
        sx={{
          // background: '#f5f7fb',
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
          Patients Social History
        </Typography>
        <Stack sx={{ width: '100%', margin: '15px', fontSize: '14px' }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: 'left', fontSize: '15px !important' }}
          >
            Recreational Activities
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
                  Smoking Status:
                </Typography>
              </Box>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Former Smoke
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
                3 times per week
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
            Other Social History
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
                  Marital Status:
                </Typography>
              </Box>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Single
              </Button>
            </Box>

            <Box sx={{ margin: '15px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="tabler:circle-check-filled" />
                <Typography variant="p" sx={{ ml: '5px' }}>
                  Dietary Preferences:
                </Typography>
              </Box>
              <Button variant="outlined" sx={{ mt: '5px', mx: '5px' }}>
                Vegetarian
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
