import { Helmet } from 'react-helmet-async';
// sections
import { HospitalsView } from 'src/sections/facilities/view';

// ----------------------------------------------------------------------

export default function HospitalsMap() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Hospitals Map</title>
      </Helmet>

      <HospitalsView />
    </>
  );
}
