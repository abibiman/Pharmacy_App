import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container';

// components
import { useSettingsContext } from 'src/components/settings';

import BasicTable from './basic-table';

//
import ComponentBlock from './component-block';
import Surgeries from './surgeries';
import Allergies from './allergies';
import Immunizations from './immunizations';
import Accidents from './accidents';
import Hospitalizations from './hospitalizations';
import Family from './family';
import VitalsPressure from './vitals-pressure';
import VitalsBloodSugar from './vitals-blood-sugar';
import VitalsOxygen from './vitals-oxygen';
import VitalsWeight from './vitals-weight';

// ----------------------------------------------------------------------



export default function PatientVitals({ id }) {
  const settings = useSettingsContext();

  return (
    <Container sx={{ my: 10 }}>
      <Stack spacing={3}>
        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Blood Pressure" sx={{ textAlign: 'center' }} />
            <VitalsPressure />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Blood Sugar" sx={{ textAlign: 'center' }} />
            <VitalsBloodSugar />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Blood Oxygen" sx={{ textAlign: 'center' }} />
            <VitalsOxygen />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Weight" sx={{ textAlign: 'center' }} />
            <VitalsWeight />
          </Card>
        </ComponentBlock>
      </Stack>
    </Container>
  );
}

PatientVitals.propTypes = {
  id: PropTypes.string,
};
