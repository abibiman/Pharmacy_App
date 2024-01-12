import { Helmet } from 'react-helmet-async';
// sections
import { ProvidersCollectionView } from 'src/sections/providers/view';

// ----------------------------------------------------------------------

export default function ProvidersCollectionPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: All Providers</title>
      </Helmet>

      <ProvidersCollectionView />
    </>
  );
}
