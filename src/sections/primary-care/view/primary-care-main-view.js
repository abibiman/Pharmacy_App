// ----------------------------------------------------------------------

import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from 'src/auth/context/jwt';
import { SplashScreen } from 'src/components/loading-screen';

import PrimaryCareIntro from './primary-care-intro';
import PrimaryCareProfileView from './primary-care-profile-view';
import { fetchPrimaryCareProvider } from '../helpers/request';

export default function PrimaryCareMainView() {
  const { user } = useContext(AuthContext);
  const [selectionData, setSelectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const primaryData = await fetchPrimaryCareProvider(user?.userID, user?.token);
        setSelectionData(primaryData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;

  if (loading) {
    // Display loader while loading
    content = <SplashScreen />;
  } else if (selectionData !== null && typeof selectionData === 'object') {
    content = <PrimaryCareProfileView data={selectionData} />;
  } else if (typeof selectionData === 'string') {
    content = <PrimaryCareIntro />;
  } else {
    content = <PrimaryCareIntro />;
  }
  return <Stack>{content}</Stack>;
}
