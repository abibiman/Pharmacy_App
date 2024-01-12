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
  PatientNoteImage,
  PrescriptionImage,
  TreatmentImage,
  // WelcomeImage,
  // WelcomeImageAlt,
} from 'src/assets/images';
//
import OverviewRecordsItem from '../overview-records-item';

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
        My Health Records
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
            title="Vaccinations"
            subheader="Understanding Medical Conditions and Treatment Options"
            Illustration={empty ? MedicalDiagnosisImage : ''}
            link="diagnosis"
          />
          <OverviewRecordsItem
            title="Conditions"
            subheader="Expert Guidance and Medication Information"
            Illustration={empty ? PrescriptionImage : ''}
            link="medication"
          />
          <OverviewRecordsItem
            title="Habits"
            subheader="Comprehensive Care and Therapeutic Solutions"
            Illustration={empty ? TreatmentImage : ''}
          />
          <OverviewRecordsItem
            title="Vitals"
            subheader="Recording Your Healthcare Journey and Medical History"
            Illustration={empty ? PatientNoteImage : ''}
            link="notes"
          />
          <OverviewRecordsItem
            title="Prescriptions"
            subheader="Recording Your Healthcare Journey and Medical History"
            Illustration={empty ? PatientNoteImage : ''}
            link="notes"
          />
          <OverviewRecordsItem
            title="Medications"
            subheader="Recording Your Healthcare Journey and Medical History"
            Illustration={empty ? PatientNoteImage : ''}
            link="notes"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
