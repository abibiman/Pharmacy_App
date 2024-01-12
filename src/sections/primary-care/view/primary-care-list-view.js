import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { SplashScreen } from 'src/components/loading-screen';
import LoadingScreen from 'src/components/loading-screen/loading-screen';
import { AuthContext } from 'src/auth/context/jwt';
import PrimaryCareList from '../primary-care-list';
// ----------------------------------------------------------------------

export default function ProvidersCollectionView() {
  const settings = useSettingsContext();
  const { user } = useContext(AuthContext);
  const { token } = user;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://abibiman-api.onrender.com/providers/type/primary`,
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log(response);
        setData(response?.data.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="All Primary Care Providers"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Providers', href: paths.dashboard.providers.collection.root },
          { name: 'All' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* {loading ? <LoadingScreen /> : <PrimaryCareList providers={data} />} */}
      <PrimaryCareList providers={data} />
    </Container>
  );
}
