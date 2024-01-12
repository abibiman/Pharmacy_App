// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
//
import AnalyticsOrderTimeline from '../analytics-order-timeline';
import AnalyticsWebsiteVisits from '../analytics-website-visits';
import AnalyticsWidgetSummary from '../analytics-widget-summary';
import AnalyticsConversionRates from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

const pressureReadings = [
  {
    id: '1',
    reading: '120/78',
    date: '11 Sep 2023 7:30 AM',
    status: 'good',
  },
  {
    id: '2',
    reading: '130/68',
    date: '11 Sep 2023 9:30 AM',
    status: 'warning',
  },
  {
    id: '3',
    reading: '140/85',
    date: '11 Sep 2023 11:30 AM',
    status: 'bad',
  },
  {
    id: '4',
    reading: '120/78',
    date: '11 Sep 2023 1:30 PM',
    status: 'good',
  },
];

const bloodSugarReadings = [
  {
    id: '1',
    reading: '120',
    date: '11 Sep 2023 7:30 AM',
    status: 'warning',
  },
  {
    id: '2',
    reading: '95',
    date: '11 Sep 2023 9:30 AM',
    status: 'good',
  },
  {
    id: '3',
    reading: '99',
    date: '11 Sep 2023 11:30 AM',
    status: 'good',
  },
  {
    id: '4',
    reading: '100',
    date: '11 Sep 2023 1:30 PM',
    status: 'good',
  },
];

const bloodOxygen = [
  {
    id: '1',
    reading: '88',
    date: '11 Sep 2023 7:30 AM',
    status: 'good',
  },
  {
    id: '2',
    reading: '95',
    date: '11 Sep 2023 9:30 AM',
    status: 'good',
  },
  {
    id: '3',
    reading: '99',
    date: '11 Sep 2023 11:30 AM',
    status: 'good',
  },
  {
    id: '4',
    reading: '79',
    date: '11 Sep 2023 1:30 PM',
    status: 'warning',
  },
];

const weight = [
  {
    id: '1',
    reading: '98',
    date: '11 Sep 2023 7:30 AM',
    status: 'good',
  },
  {
    id: '2',
    reading: '97',
    date: '11 Sep 2023 9:30 AM',
    status: 'good',
  },
  {
    id: '3',
    reading: '99',
    date: '11 Sep 2023 11:30 AM',
    status: 'good',
  },
  {
    id: '4',
    reading: '99',
    date: '11 Sep 2023 1:30 PM',
    status: 'good',
  },
];

export default function OverviewAnalyticsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        My Health Metrics
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Latest Blood Pressure"
            total="120/80 mmHg"
            icon={<img alt="icon" src="/assets/icons/glass/heart-attack.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Latest Blood Sugar Level"
            total="100 mg/dL"
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/sugar-cube.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Latest Blood Oxygen Level"
            total="92%"
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/oxygen.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Latest Weight"
            total="84Kg"
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/weight-loss.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <AnalyticsOrderTimeline title="Latest Blood Pressure" list={pressureReadings} />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <AnalyticsOrderTimeline title="Latest Blood Sugar" list={bloodSugarReadings} />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <AnalyticsOrderTimeline title="Latest Blood Oxygen" list={bloodOxygen} />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <AnalyticsOrderTimeline title="Latest Weight" list={weight} />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AnalyticsWebsiteVisits
            title="Blood Pressure | Sugar | Oxygen"
            subheader="Monthly Averages: This Year"
            chart={{
              labels: [
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
                '12/01/2022',
              ],
              series: [
                {
                  name: 'Blood Sugar',
                  type: 'column',
                  fill: 'solid',
                  data: [73, 71, 72, 77, 73, 72, 77, 71, 74, 72, 70, 78],
                },
                {
                  name: 'Blood Pressure',
                  type: 'area',
                  fill: 'gradient',
                  data: [144, 155, 141, 167, 122, 143, 121, 141, 156, 127, 143, 134],
                },
                {
                  name: 'Blood Oxygen',
                  type: 'line',
                  fill: 'solid',
                  data: [80, 85, 86, 80, 85, 85, 84, 82, 89, 86, 89, 91],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AnalyticsConversionRates
            title="Weight"
            subheader="Monthly Averages; Kg"
            chart={{
              series: [
                { label: 'January', value: 88 },
                { label: 'February', value: 89 },
                { label: 'March', value: 93 },
                { label: 'April', value: 95 },
                { label: 'May', value: 93 },
                { label: 'June', value: 92 },
                { label: 'July', value: 91 },
                { label: 'August', value: 88 },
                { label: 'September', value: 86 },
                { label: 'October', value: 88 },
                { label: 'November', value: 89 },
                { label: 'December', value: 88 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
