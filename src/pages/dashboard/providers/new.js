import { Helmet } from 'react-helmet-async';
// sections
import { ProvidersCreateView } from 'src/sections/providers/view';

// ----------------------------------------------------------------------

export default function ProvidersCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new job</title>
      </Helmet>

      <ProvidersCreateView />
    </>
  );
}
