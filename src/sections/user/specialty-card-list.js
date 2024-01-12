import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { AuthContext } from 'src/auth/context/jwt';
// utils
import customAxios from 'src/utils/customAxios';
// @mui
//
import SpecialtyCard from './specialty-card';
// ----------------------------------------------------------------------

export default function SpecialtyCardList({ providers, name }) {
  const { user } = useContext(AuthContext);
  const { token } = user;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(`/providers/category/get?category=${name}`);
        setData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
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
      {data.map((userInfo) => (
        <SpecialtyCard key={userInfo._id} user={userInfo} />
      ))}
    </Box>
  );
}

SpecialtyCardList.propTypes = {
  providers: PropTypes.array,
  name: PropTypes.string,
};
