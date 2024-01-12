import { Helmet } from 'react-helmet-async';
// sections
import { AppointmentListView } from 'src/sections/appointments/view';

// ----------------------------------------------------------------------

export default function AppointmentListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: My Appointments</title>
      </Helmet>

      <AppointmentListView />
    </>
  );
}
