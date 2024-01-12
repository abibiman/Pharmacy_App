import PropTypes from 'prop-types';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function RiskAssessment({ sx, ...other }) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette.primary.light, 0.2),
          endColor: alpha(theme.palette.primary.main, 0.2),
        }),
        p: 5,
        borderRadius: 2,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Button
        size="large"
        color="inherit"
        variant="contained"
        sx={{
          mt: 5,
          mb: 2,
          color: 'common.white',
          bgcolor: 'grey.800',
          '&:hover': {
            bgcolor: 'grey.700',
          },
        }}
      >
        Assess Health Risk
      </Button>

      <Typography variant="caption" sx={{ color: 'primary.dark', textAlign: 'center' }}>
        Check Diabetes/High Blood Pressure Risk Score
      </Typography>
    </Stack>
  );
}

RiskAssessment.propTypes = {
  sx: PropTypes.object,
};
