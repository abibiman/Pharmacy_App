import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { AppointmentDetailsView } from 'src/sections/appointments/view';

// ----------------------------------------------------------------------

export default function AppointmentDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Appointment Details</title>
      </Helmet>

      <AppointmentDetailsView id={`${id}`} />
    </>
  );
}
