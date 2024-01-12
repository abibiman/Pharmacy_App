import { useEffect, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// _mock
// components
import { useSettingsContext } from 'src/components/settings';

//
import DisplaySocialHistory from '../display-social-history-component';
import DisplayMedicalHistory from '../display-medical-history-component';

export default function OverviewHistoryView() {
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
        My Health History
      </Typography>

      <DisplaySocialHistory />
      <DisplayMedicalHistory />
    </Container>
  );
}
