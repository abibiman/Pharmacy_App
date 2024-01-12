import { Helmet } from 'react-helmet-async';
// sections
import { DiagnosticView } from 'src/sections/facilities/view';

// ----------------------------------------------------------------------

export default function DiagnosticCentersMap() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Diagnostic-centers Map</title>
      </Helmet>

      <DiagnosticView />
    </>
  );
}
