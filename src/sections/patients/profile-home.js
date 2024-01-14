import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
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
import Container from '@mui/material/Container';
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';


// utils
import { fNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';

import AppWidget from './app-widget';
import AppWelcome from './app-welcome';
import AppFeatured from './app-featured';
import AppNewInvoice from './app-new-invoice';
import AppTopAuthors from './app-top-authors';
import AppTopRelated from './app-top-related';
import AppAreaInstalled from './app-area-installed';
import AppWidgetSummary from './app-widget-summary';
import AppCurrentDownload from './app-current-download';
import AppTopInstalledCountries from './app-top-installed-countries';
//

// ----------------------------------------------------------------------

export default function ProfileHome({ data }) {

  const theme = useTheme();

  const settings = useSettingsContext();

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
        <Stack width={1} sx={{ color: '#000080' }}>
          {fNumber(data?.age)}
          <Box component="span" sx={{ color: '#000000', typography: 'body2' }}>
            Age
          </Box>
        </Stack>

        <Stack width={1}sx={{ color: '#000080' }}>
          B+
          <Box component="span" sx={{ color: '#000000', typography: 'body2' }}>
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
        <Stack width={1}sx={{ color: '#000080' }}>
          Single
          <Box component="span" sx={{ color: '#000000', typography: 'body2' }}>
            Marital Status
          </Box>
        </Stack>

        <Stack width={1}sx={{ color: '#000080' }}>
          Male
          <Box component="span" sx={{ color: '#000000', typography: 'body2' }}>
            Gender
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
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
    <Grid container spacing={3}>
      

      <Grid xs={12} md={3}>
        <AppWidgetSummary
          title="Age"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8OQp7npX_qlFcgq0ygYeE86ICem-fWgX8JQ&usqp=CAU"
          percent={2.6}
          total={data.age}
          chart={{
            series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
          }}
        />
      </Grid>

      <Grid xs={12} md={3}>
        <AppWidgetSummary
          title="Blood Group"
          percent={0.2}
          image="https://cdn2.iconfinder.com/data/icons/healthcare-medical-flat/2048/233_-_Blood-512.png"
          total={'B+'}
          chart={{
            colors: [theme.palette.info.light, theme.palette.info.main],
            series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
          }}
        />
      </Grid>

      <Grid xs={12} md={3}>
        <AppWidgetSummary
          title="Gender"
          image="https://cdn-icons-png.flaticon.com/512/6146/6146171.png"
          percent={-0.1}
          total={data.gender}
          chart={{
            colors: [theme.palette.warning.light, theme.palette.warning.main],
            series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
          }}
        />
      </Grid>

      <Grid xs={12} md={3}>
        <AppWidgetSummary
          title="Ethnicity"
          image="https://cdn2.iconfinder.com/data/icons/diversity-civil-rights-innovicons-color/128/Nationality-ethnicity-race-world-512.png"
          percent={-0.1}
          total={data.ethnicity?data.ethnicity:'Black'}
          chart={{
            colors: [theme.palette.warning.light, theme.palette.warning.main],
            series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
          }}
        />
      </Grid>


      <Grid xs={12} md={6} lg={8}>
        <AppAreaInstalled
          title="Monthly Risk Assesment Score"
          chart={{
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            series: [
              {
                year: '2023',
                data: [
                  {
                    name: 'Diabetes',
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                  },  
                  {
                    name: 'Hypertension',
                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                  },
                ],
              },
              {
                year: '2020',
                data: [
                  {
                    name: 'Diabetes',
                    data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                  },
                  {
                    name: 'Hypertension',
                    data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                  },
                ],
              },
            ],
          }}
        />
      </Grid>




      <Grid xs={12} md={12} lg={4}>
       {renderAddress}
       <AppWidget
            title="Health Status"
            total={data.healthStatus}
            icon="solar:user-rounded-bold"
            chart={{
              series: 48,
            }}
          />
      </Grid>

    </Grid>
  </Container>
  );
}

ProfileHome.propTypes = {
  data: PropTypes.array,
};
