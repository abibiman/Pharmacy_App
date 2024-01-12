import { Helmet } from 'react-helmet-async';
// sections
import { OverviewMetricsView } from 'src/sections/metrics/view';

// ----------------------------------------------------------------------

export default function OverviewMetricsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: My Metrics</title>
      </Helmet>

      <OverviewMetricsView />
    </>
  );
}
