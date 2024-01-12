import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { AuthContext } from 'src/auth/context/jwt';
import { LoadingScreen } from 'src/components/loading-screen';
// utils
import customAxios from 'src/utils/customAxios';
// @mui
import ProvidersCollectionCard from './providers-collection-card';
// ----------------------------------------------------------------------

export default function SpecialtyCardList({ providers, name }) {
  const { user } = useContext(AuthContext);
  const { token } = user;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await customAxios.get(`/providers/category/get?category=${name}`);
        setData(response.data.data);
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
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        data.map(
          (providerInfo) => (
            <ProvidersCollectionCard key={providerInfo._id} provider={providerInfo} />
          )
          // <SpecialtyCard key={providerInfo._id} provider={providerInfo} />
        )
      )}
    </Box>
  );
}

SpecialtyCardList.propTypes = {
  providers: PropTypes.array,
  name: PropTypes.string,
};
