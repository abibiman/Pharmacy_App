import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
//
import ProvidersCollectionCard from './providers-collection-card';
// ----------------------------------------------------------------------

export default function ProvidersCollectionList({ providers }) {
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

ProvidersCollectionList.propTypes = {
  providers: PropTypes.array,
};
