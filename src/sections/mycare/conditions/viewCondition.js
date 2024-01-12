import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AuthContext } from 'src/auth/context/jwt';

// _mock
import { _appInvoices } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import customAxios from 'src/utils/customAxios';
// assets
import RiskAssessment from './risk-assessment';
import ConditionDetailsTable from './condition-details-table';
import ConditionSummary from './condition-summary';

// ----------------------------------------------------------------------

export default function ViewCondition() {
  const { id } = useParams();
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  const [conditionDetails, setConditionDetails] = useState({});

  const fetchConditionDetails = async () => {
    try {
      const {
        data: { data },
      } = await customAxios.get(`/conditions/detail/${id}`);

      setConditionDetails(data);
    } catch (err) {
      console.log(err);
    }

    return null;
  };

  const settings = useSettingsContext();

  useEffect(() => {
    fetchConditionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <ConditionSummary
            title="Condition"
            percent={2.6}
            total={conditionDetails?.name || ''}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <ConditionSummary
            title="Condition Type"
            percent={0.2}
            total={`Type ${conditionDetails?.type || ''}`}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <ConditionSummary
            title="Year Diagnosed"
            percent={-0.1}
            total={conditionDetails?.year}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>

        <Grid xs={12} lg={12}>
          <ConditionDetailsTable
            title="Medications"
            tableData={conditionDetails?.medications || []}
            tableLabels={[
              { id: 'id', label: 'Medication' },
              { id: 'category', label: 'Daily Dosage' },
              { id: 'price', label: 'Date Started' },
              { id: 'prices', label: 'Date Ended' },
              { id: 'pricess', label: 'Status' },
            ]}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
            <Typography gutterBottom variant="subtitle1" sx={{ color: 'Primary' }}>
              Doctors Notes
            </Typography>

            <Typography gutterBottom variant="body2" sx={{ color: 'Primary' }}>
              Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque auctor
              neque nec urna. Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus.
              Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque auctor
              neque nec urna. Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus.
              Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque suscipit
              tellus.
            </Typography>
          </Paper>
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <RiskAssessment sx={{ mt: 1 }} />
        </Grid>
      </Grid>
    </Container>
  );
}
