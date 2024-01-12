import { Helmet } from 'react-helmet-async';
// sections
import { PharmaciesView } from 'src/sections/facilities/view';

// ----------------------------------------------------------------------

export default function PharmaciesMap() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Pharmacies Map</title>
      </Helmet>

      <PharmaciesView />
    </>
  );
}
