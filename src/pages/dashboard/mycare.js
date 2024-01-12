import { Helmet } from 'react-helmet-async';
// sections
import { OverviewRecordsView } from 'src/sections/mycare/view';

// ----------------------------------------------------------------------

export default function OverviewMyCarePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: My Care</title>
      </Helmet>

      <OverviewRecordsView />
    </>
  );
}
