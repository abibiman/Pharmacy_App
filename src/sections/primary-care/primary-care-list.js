import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
//
import ProvidersCollectionCard from './primary-care-list-card';
// ----------------------------------------------------------------------

export default function PrimaryCareList({ providers }) {
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
      {providers.map((provider) => (
        <ProvidersCollectionCard key={provider.id} provider={provider} />
      ))}
    </Box>
  );
}

PrimaryCareList.propTypes = {
  providers: PropTypes.array,
};
