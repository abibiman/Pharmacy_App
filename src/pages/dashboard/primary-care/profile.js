import { Helmet } from 'react-helmet-async';
// sections
import { PrimaryCareProfileView } from 'src/sections/primary-care/view';

// ----------------------------------------------------------------------

export default function PrimaryCareList() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Primary Care Profile</title>
      </Helmet>

      <PrimaryCareProfileView />
    </>
  );
}
