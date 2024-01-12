import { useState, useCallback, useEffect, useContext } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
// routes
import { paths } from 'src/routes/paths';
// hooks
// _mock
import { _userFeeds } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { LoadingScreen } from 'src/components/loading-screen';
import { AuthContext } from 'src/auth/context/jwt';
import { getOneUser } from 'src/sections/account/helpers/request';
import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'User Information',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const settings = useSettingsContext();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await getOneUser(user?.userID, user?.token);

      setUserData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data);

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`${userData?.firstName || ' '} ${userData?.lastName || ' '}`}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          // { name: 'Provider', href: paths.dashboard.providers.root },
          { name: `${userData?.firstName || ' '} ${userData?.lastName || ' '}` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* {loading ? (
        <LoadingScreen />
      ) : ( */}
      <>
        <Card
          sx={{
            mb: 3,
            height: 290,
          }}
        >
          <ProfileCover
            name={`${userData?.firstName || ' '} ${userData?.lastName || ' '}`}
            avatarUrl={userData?.photo}
            coverUrl="https://i.ibb.co/RYSGcXH/Pngtree-traditional-african-color-pattern-1590972.jpg"
          />

          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        {currentTab === 'profile' && <ProfileHome data={userData} posts={_userFeeds} />}
      </>
      {/* )} */}
    </Container>
  );
}
