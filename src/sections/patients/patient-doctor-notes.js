import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
// import { useRef } from 'react';
// // @mui
// import { alpha } from '@mui/material/styles';
// import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { useTypography } from 'src/components/text-max-line';
import Container from '@mui/material/Container';
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';
import Typography from '@mui/material/Typography';

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

const TYPOGRAPHYS = [

  {
    label:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.',
    variant: 'body1',
  }

];

export default function PatientDoctorNotes({ data }) {

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



  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>

    <Grid xs={12} md={9}>
            <Stack spacing={3}>
              {TYPOGRAPHYS.map((font) => (
                <BlockVariant key={font.variant} font={font} />
              ))}
            </Stack>
          </Grid>


  </Container>
  );
}

PatientDoctorNotes.propTypes = {
  data: PropTypes.array,
};

function BlockVariant({ font }) {
  const { variant, label } = font;

  const { fontSize, lineHeight, fontWeight, letterSpacing = 0 } = useTypography(variant);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
      <Typography variant={variant} gutterBottom>
        {label}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        24/06/2023 Dr Collins Kwarteng
      </Typography>
    </Paper>
  );
}

BlockVariant.propTypes = {
  font: PropTypes.object,
};