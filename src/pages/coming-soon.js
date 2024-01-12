import { Helmet } from 'react-helmet-async';
// sections
import ComingSoonView from 'src/sections/coming-soon/view';

// ----------------------------------------------------------------------

export default function ComingSoonPage() {
  return (
    <>
      <Helmet>
        <title> Waitlist</title>
      </Helmet>

      <ComingSoonView />
    </>
  );
}
