import { Helmet } from 'react-helmet-async';
// sections
import SpecialtyCardView from 'src/sections/user/view/specialty-cards-view';

// ----------------------------------------------------------------------

export default function UserCardsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Specialty</title>
      </Helmet>

      <SpecialtyCardView />
    </>
  );
}
