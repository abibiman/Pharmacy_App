import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ProvidersEditView } from 'src/sections/providers/view';

// ----------------------------------------------------------------------

export default function ProvidersEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Dashboard: Job Edit</title>
      </Helmet>

      <ProvidersEditView id={`${id}`} />
    </>
  );
}
