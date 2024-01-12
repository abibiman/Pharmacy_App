import { Helmet } from 'react-helmet-async';
// sections
import { PrimaryCareListView } from 'src/sections/primary-care/view';

// ----------------------------------------------------------------------

export default function PrimaryCareList() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Primary Care List</title>
      </Helmet>

      <PrimaryCareListView />
    </>
  );
}
