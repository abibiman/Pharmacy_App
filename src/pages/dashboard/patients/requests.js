import { Helmet } from 'react-helmet-async';
// sections
import  RequestListView  from 'src/sections/patients/view/request-list-view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Physician Requests</title>
      </Helmet>

      <RequestListView />
    </>
  );
}
