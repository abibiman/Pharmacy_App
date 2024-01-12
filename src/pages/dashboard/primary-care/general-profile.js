import { Helmet } from 'react-helmet-async';
// sections
import { GeneralPrimaryCareProfileView } from 'src/sections/primary-care/view';

// ----------------------------------------------------------------------

export default function PrimaryCareList() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Primary Care Profile</title>
      </Helmet>

      <GeneralPrimaryCareProfileView />
    </>
  );
}
