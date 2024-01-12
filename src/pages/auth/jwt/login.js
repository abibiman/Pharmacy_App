import { Helmet } from 'react-helmet-async';
// sections
import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Telical Pharmacy: Login</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
