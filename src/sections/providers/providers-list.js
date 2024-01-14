import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
// routes//
import ProvidersItem from './providers-item';

// ----------------------------------------------------------------------

const demo = [
  { id: 1, name: 'Biopsy' },
  { id: 2, name: 'Blood Test' },
  { id: 3, name: 'X-Ray' },
  { id: 4, name: 'MRI Scan' },
  { id: 5, name: 'CT Scan' },
  { id: 6, name: 'EKG' },
  { id: 7, name: 'Ultrasound' },
  { id: 8, name: 'Allergy Test' },
  { id: 9, name: 'Eye Examination' },
  { id: 10, name: 'Skin Test' },
  { id: 11, name: 'Stress Test' },
  { id: 12, name: 'Thyroid Function Test' }
]

export default function ProvidersList({ providers }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {demo.map((provider) => (
        <ProvidersItem key={provider.id} provider={provider} />
      ))}
    </Box>
  );
}

ProvidersList.propTypes = {
  providers: PropTypes.array,
};
