import PropTypes from 'prop-types';
// import { useRef } from 'react';
// // @mui
// import { alpha } from '@mui/material/styles';
// import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';

// utils
import { fNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
//

// ----------------------------------------------------------------------

export default function ProfileHome({ data }) {
  const activityHistory = [
    { timestamp: '10 minutes ago', activity: 'Paid for a consultation' },
    { timestamp: '1 hour ago', activity: 'Booked an appointment with a Dr. Clinton Borga' },
    { timestamp: '2 hours ago', activity: 'Cancelled an appointment' },
  ];

  const renderInfo = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(data?.age)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Age
          </Box>
        </Stack>

        <Stack width={1}>
          {data?.bloodType}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Blood Type
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderBMI = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {data.weight}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Weight
          </Box>
        </Stack>

        <Stack width={1}>
          {data.height}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Height
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAddress = (
    <Card>
      <CardHeader title="Address" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Box sx={{ typography: 'body2' }}>{info.description}</Box> */}
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {data?.email}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Iconify icon="ph:phone-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {data?.phoneNumber}
            </Link>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: `${data.address?.Country ? 'flex' : 'none'}` }}
        >
          <Iconify icon="clarity:world-solid" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {data.address?.Country}
            </Link>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Iconify icon="iconamoon:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {data.address?.region}
            </Link>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ display: `${data.address?.Country ? 'flex' : 'none'}` }}
        >
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {data?.city || ' '}
            </Link>
          </Box>
        </Stack>
        {/* <Stack direction="row" spacing={2}>
          <Iconify icon="dashicons:post-status" width={24} />

          <Box sx={{ typography: 'body2' }}>
            <Link variant="subtitle2" color="inherit">
              {data.address?.ghanaPostId}
            </Link>
          </Box>
        </Stack> */}
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={6} sx={{ p: 3 }}>
        <Stack spacing={6} sx={{ p: 3 }}>
          <Stack direction="column" spacing={3}>
            {/* {data.about ? (
              info.renderAbout.map((item) => (
                <Box sx={{ display: 'flex', alignItems: 'center', typography: 'body2' }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'text.primary',
                      mr: 2,
                    }}
                  />{' '}
              
                  {item}
                </Box>
              ))
            ) : (
              <a>.</a>
            )} */}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );

  const renderPostInputs = (
    <Card>
      <CardHeader title="My Activities" />

      <Stack spacing={6} sx={{ p: 3 }}>
        <Stack direction="column" spacing={3}>
          {activityHistory.map((entry, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center">
              <Iconify icon="bi:clock-history" width={24} />
              <Box sx={{ typography: 'body2', flex: 1 }}>
                {entry.timestamp}: {entry.activity}
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <Stack spacing={3}>
          {renderInfo}

          {renderAddress}
          {renderAbout}
        </Stack>
      </Grid>

      <Grid xs={12} md={6}>
        <Stack spacing={3}>
          {renderBMI}
          {renderPostInputs}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  data: PropTypes.array,
};
