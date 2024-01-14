import { Helmet } from 'react-helmet-async';
// sections
import { UserListView } from 'src/sections/patients/view';

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Patient List</title>
      </Helmet>

      <UserListView />
    </>
  );
}
