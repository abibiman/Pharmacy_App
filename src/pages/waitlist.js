import { Helmet } from 'react-helmet-async';
// sections
import WaitlistView from '../sections/waitlist/view'

// ----------------------------------------------------------------------

export default function WaitlistPage() {
  return (
    <>
      <Helmet>
        <title> Waitlist: Join the Waitlist</title>
      </Helmet>

      <WaitlistView />
    </>
  );
}
