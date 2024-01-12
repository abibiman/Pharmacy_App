import { Helmet } from 'react-helmet-async';
import { ProvidersProfileView } from 'src/sections/providers/view';

// ----------------------------------------------------------------------

export default function ProvidersProfilePage() {
  return (
    <>
      <Helmet>
        <title> Provider</title>
      </Helmet>

      <ProvidersProfileView />
    </>
  );
}
