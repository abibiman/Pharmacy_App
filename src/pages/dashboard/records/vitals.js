import { Helmet } from 'react-helmet-async';
// sections
import { OverviewMetricsView } from '../../../sections/metrics/view';

// ----------------------------------------------------------------------

export default function AllVitals() {
  return (
    <>
      <Helmet>
        <title> Dashboard: All Vitals</title>
      </Helmet>

      <OverviewMetricsView />
    </>
  );
}
