import { Helmet } from 'react-helmet-async';
// sections
import { OverviewRecordsView } from 'src/sections/overview/records/view';

// ----------------------------------------------------------------------

export default function AllRecordsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Medical Records</title>
      </Helmet>

      <OverviewRecordsView />
    </>
  );
}
