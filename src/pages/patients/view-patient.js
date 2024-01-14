import { Helmet } from 'react-helmet-async';
import { UserProfileView } from 'src/sections/patients/view';

// ----------------------------------------------------------------------

export default function ViewPatientPage() {

  return (
    <>
      <Helmet>
        <title> Patient View</title>
      </Helmet>

      <UserProfileView />
    </>
  );
}
