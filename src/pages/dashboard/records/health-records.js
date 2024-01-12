import { Helmet } from 'react-helmet-async';
// sections
import { OverviewHistoryView } from 'src/sections/records/view';

// ----------------------------------------------------------------------

export default function OverviewRecordsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: My Care</title>
      </Helmet>

      <OverviewHistoryView />
    </>
  );
}
