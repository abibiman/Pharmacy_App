import { Helmet } from 'react-helmet-async';
import AppointmentListView from 'src/sections/patients/view/appointment-list-view';
// sections
import  RequestListView  from 'src/sections/patients/view/request-list-view';

// ----------------------------------------------------------------------

export default function AppointmentRequestListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Physician Requests</title>
      </Helmet>

      <AppointmentListView />
    </>
  );
}
