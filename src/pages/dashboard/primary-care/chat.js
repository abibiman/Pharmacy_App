import { Helmet } from 'react-helmet-async';
// sections
import { ProvidersCollectionView } from 'src/sections/providers/view';

// ----------------------------------------------------------------------

export default function PrimaryCareChat() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Primary Care Chat</title>
      </Helmet>

      <ProvidersCollectionView />
    </>
  );
}
