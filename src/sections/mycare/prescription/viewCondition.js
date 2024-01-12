import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AuthContext } from 'src/auth/context/jwt';

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

  console.log(conditionDetails);
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
            title="Date Added"
            percent={0.2}
            total="18/05/1800"
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <ConditionSummary
            title="Average Score"
            percent={-0.1}
            total="40%"
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>

        <Grid xs={12} lg={12}>
          <ConditionDetailsTable
            title="Condition Assessment History"
            tableData={conditionDetails?.medications || []}
            tableLabels={[
              { id: 'id', label: 'Condition' },
              { id: 'category', label: 'Date Recorded' },
              { id: 'price', label: 'Assessment Score' },
              { id: 'prices', label: 'Assessment Remark' },
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
