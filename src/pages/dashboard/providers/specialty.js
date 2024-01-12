import { Helmet } from 'react-helmet-async';
// sections
import SpecialtyCardView from 'src/sections/providers/view/specialty-cards-view';

// ----------------------------------------------------------------------

export default function ProvidersSpecialtyCardsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Specialty</title>
      </Helmet>

      <SpecialtyCardView />
    </>
  );
}
