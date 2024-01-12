import { Helmet } from 'react-helmet-async';
// sections
import { PrimaryCareMainView } from 'src/sections/primary-care/view';

// ----------------------------------------------------------------------

export default function PrimaryCareMainPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Primary Care Main Page</title>
      </Helmet>

      <PrimaryCareMainView />
    </>
  );
}
