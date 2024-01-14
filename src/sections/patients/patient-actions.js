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
import EcommerceCurrentBalance from '../overview/e-commerce/ecommerce-current-balance';

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

export default function PatientActions({ id }) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
    <Grid container spacing={3}>


      <Grid xs={12} md={6} lg={4}>
        <EcommerceCurrentBalance
          title="Prescribe Medication"
          currentBalance={187650}
          sentAmount={25500}
          link=""
        />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <EcommerceCurrentBalance
          title="Refer Patient"
          currentBalance={187650}
          sentAmount={25500}
          link=""
        />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <EcommerceCurrentBalance
          title="Add Note"
          currentBalance={187650}
          sentAmount={25500}
          link=""
        />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <EcommerceCurrentBalance
          title="Update Medical History"
          currentBalance={187650}
          sentAmount={25500}
          link=""
        />
      </Grid>


      <Grid xs={12} md={6} lg={4}>
        <EcommerceCurrentBalance
          title="Order Labs"
          currentBalance={187650}
          sentAmount={25500}
          link=""
        />
      </Grid>


      <Grid xs={12} md={6} lg={4}>
        <EcommerceCurrentBalance
          title="Order Imaging"
          currentBalance={187650}
          sentAmount={25500}
          link=""
        />
      </Grid>




    </Grid>
  </Container>
  );
}

PatientActions.propTypes = {
  id: PropTypes.string,
};
