import { useEffect, useState } from 'react';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
// import { ForbiddenIllustration } from 'src/assets/illustrations';
import {
  MedicalDiagnosisImage,
  Medication,
  PrescriptionImage,
  PreventiveManagement,
  Devices,
  Vitals,
  // WelcomeImage,
  // WelcomeImageAlt,
} from 'src/assets/images';
//
import OverviewRecordsItem from './overview-records-item';

export default function OverviewRecordsView() {
  const settings = useSettingsContext();

  const [empty, setEmpty] = useState(true);
  useEffect(() => {
    if (empty !== true) {
      setEmpty(true);
    }
  }, [empty]);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        My Care
      </Typography>

      <Grid container spacing={3}>
        <Grid
          xs={12}
          md={12}
          lg={12}
          sx={{
            maxHeight: '100%',
            height: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '15px',

            '@media (max-width: 1300px)': {
              gridTemplateColumns: 'repeat(1, 1fr)', // Change the number of columns at 'md' breakpoint
            },
          }}
        >
          <OverviewRecordsItem
            title="Conditions"
            subheader="Understanding Medical Conditions and Treatment Options"
            Illustration={empty ? MedicalDiagnosisImage : ''}
            link="conditions"
          />
          <OverviewRecordsItem
            title="Preventive Care"
            subheader="Expert Guidance and Medication Information"
            Illustration={empty ? PreventiveManagement : ''}
            link="preventive"
          />
          <OverviewRecordsItem
            title="Devices"
            subheader="Comprehensive Care and Therapeutic Solutions"
            Illustration={empty ? Devices : ''}
            link="vitals"
          />
          <OverviewRecordsItem
            title="Vitals"
            subheader="Recording Your Healthcare Journey and Medical History"
            Illustration={empty ? Vitals : ''}
            link="vitals"
          />
          <OverviewRecordsItem
            title="Prescriptions"
            subheader="Recording Your Healthcare Journey and Medical History"
            Illustration={empty ? PrescriptionImage : ''}
            link="prescription"
          />
          <OverviewRecordsItem
            title="Medication"
            subheader="Recording Your Healthcare Journey and Medical History"
            Illustration={empty ? Medication : ''}
            link="medication"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
