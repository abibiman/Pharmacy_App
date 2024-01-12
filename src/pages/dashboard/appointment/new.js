import { Helmet } from 'react-helmet-async';
// sections
import { AppointmentCreateView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new appointments</title>
      </Helmet>

      <AppointmentCreateView />
    </>
  );
}
