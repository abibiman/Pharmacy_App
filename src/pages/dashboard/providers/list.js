import { Helmet } from 'react-helmet-async';
// sections
import { ProvidersListView } from 'src/sections/providers/view';

// ----------------------------------------------------------------------

export default function ProvidersListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Provider Categories</title>
      </Helmet>

      <ProvidersListView />
    </>
  );
}
