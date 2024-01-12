import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ProvidersDetailsView } from 'src/sections/providers/view';

// ----------------------------------------------------------------------

export default function ProvidersDetailsPage() {
  const params = useParams();

  const { id } = params;
  console.log(id);

  return (
    <>
      <Helmet>
        <title> Dashboard: Job Details</title>
      </Helmet>

      <ProvidersDetailsView id={`${id}`} />
    </>
  );
}
