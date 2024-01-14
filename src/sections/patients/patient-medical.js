import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';  // Import Typography
import List from '@mui/material/List';  // Import List
import ListItem from '@mui/material/ListItem';  // Import ListItem
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import OrderDetailsItems from './order-details-item';

// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//

import CollapsibleTable from './collapsible-table';
import BasicTable from './basic-table';

//
import ComponentBlock from './component-block';
import Surgeries from './surgeries';
import Allergies from './allergies';
import Immunizations from './immunizations';
import Accidents from './accidents';
import Hospitalizations from './hospitalizations';
import Family from './family';
import Conditions from './conditions';
import Medication from './medication';
import Alchohol from './alchohol';
import Smoking from './Smoking';
import Exercise from './exercise';
import Sex from './Sex';
import Work from './work';

// ----------------------------------------------------------------------

const items = [
  {
    name: 'type1',
    sku: 'unknown',
    id: 2,
    quantity: 2,
    prince: 432
  },
  {
    name: 'type1',
    sku: 'unknown',
    id: 2,
    quantity: 2,
    prince: 432
  },
  {
    name: 'type1',
    sku: 'unknown',
    id: 3,
    quantity: 2,
    prince: 432
  },
]

export default function PatientMedical({ id }) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack spacing={3}>
        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Past Medical History" sx={{ textAlign: 'center' }} />
            <BasicTable />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Past Surgical History" sx={{ textAlign: 'center' }} />
            <Surgeries />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Vaccinations" sx={{ textAlign: 'center' }} />
            <Immunizations />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Accidents" sx={{ textAlign: 'center' }} />
            <Accidents />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Hospitalizations" sx={{ textAlign: 'center' }} />
            <Hospitalizations />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Current Conditions" sx={{ textAlign: 'center' }} />
            <Conditions />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Current Medication" sx={{ textAlign: 'center' }} />
            <Medication />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Alcohol History" sx={{ textAlign: 'center' }} />
            <Alchohol />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Smoking" sx={{ textAlign: 'center' }} />
            <Smoking />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Sexual History" sx={{ textAlign: 'center' }} />
            <Sex />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Exercise" sx={{ textAlign: 'center' }} />
            <Exercise />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Work/Occupation" sx={{ textAlign: 'center' }} />
            <Work />
          </Card>
        </ComponentBlock>

        <ComponentBlock>
          <Card sx={{ width: 1 }}>
            <CardHeader title="Allergies" sx={{ textAlign: 'center' }} />
            <Allergies />
          </Card>
        </ComponentBlock>
      </Stack>
    </Container>
  );
}
