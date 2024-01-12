import { useState, useCallback, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
// @mui
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// routes
import { useParams } from 'react-router';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
// _mock
import { _providersFeeds } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSnackbar } from 'src/components/snackbar';

//
import { AuthContext } from 'src/auth/context/jwt';
import { SplashScreen } from 'src/components/loading-screen';
import { useBoolean } from 'src/hooks/use-boolean';
import ProfileHome from '../providers-profile-home';
import ProfileCover from '../providers-profile-cover';
import ProfileContactInfo from '../providers-contact-info';
import { createAppointment, fetchProviderData, fetchProvidersHoursFunc } from '../helpers/request';
import ActionBox from './action-box';
import ProviderSelectionPopup from './provider-selection-popup';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Provider Information',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'contact',
    label: 'Contact',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function PrimaryCareProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [hours, setHours] = useState({});
  const dialog = useBoolean();
  const actionBox = useBoolean();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [loading, setLoading] = useState(true);

  const [finalTimeArray, setFinalTimeArray] = useState([]);
  const [fullNameInput, setFullNameInput] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [appointmentDateInput, setAppointmentDateInput] = useState('');
  const [appointmentTimeInput, setAppointmentTimeInput] = useState('');
  const [appointmentTypeInput, setAppointmentTypeInput] = useState('');
  const AppointmentType = ['Audio', 'Video'];

  const fetchData = async () => {
    setLoading(true);
    try {
      // const providersData = await fetchProviderData(user?.token, id);
      const providersData = await fetchProviderData(user?.token, 'PDA-81198625');

      setData(providersData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchProvidersHours = async () => {
    setLoading(true);
    try {
      await fetchProvidersHoursFunc(setHours, setFinalTimeArray, user?.token, id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmitAppointment = async () => {
    dialog.onFalse();
    actionBox.onFalse();
    const dataObject = {
      providerID: id,
      userID: user?.userID,
      startTime: appointmentTimeInput,
      appointmentType: appointmentTypeInput,
      status: 'pending',
    };

    try {
      const submittedData = await createAppointment(appointmentDateInput, user?.token, dataObject);
      console.log(submittedData);
      if (submittedData) {
        toast.success('Appointment successfully booked');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProvidersHours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  if (loading || !data.title || !data.firstName || !data.lastName) {
    return <SplashScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`${data.title} ${data.firstName} ${data.lastName}`}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Provider List', href: paths.dashboard.primaryCare.list },
          { name: `${data.title} ${data.firstName} ${data.lastName}` },
        ]}
        action={
          <>
            <Button
              component={RouterLink}
              href="#"
              variant="contained"
              startIcon={<Iconify icon="gridicons:create" />}
              onClick={dialog.onTrue}
            >
              Book Appointment
            </Button>

            <Button
              component={RouterLink}
              variant="contained"
              startIcon={<Iconify icon="ep:select" />}
              sx={{ marginLeft: '5px' }}
              onClick={() => setOpenDialogBox(true)}
            >
              Select Provider
            </Button>
          </>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={data?.specialization || ' '}
          name={`${data?.title || ' '} ${data?.firstName || ' '} ${data?.lastName || ' '}`}
          avatarUrl={data?.photo}
          coverUrl="https://i.ibb.co/XC0WYHf/6302751-min.jpg"
          // https://i.ibb.co/F5YnDVk/6302751-min-copy.jpg
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

      {currentTab === 'profile' && <ProfileHome info={data} posts={_providersFeeds} />}

      {currentTab === 'contact' && (
        <ProfileContactInfo info={data} posts={_providersFeeds} hours={hours} />
      )}

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>
          Make An Appointment with {data.title} {data.firstName} {data.lastName}{' '}
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>Please fill the form below</Typography>

          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Full Name"
            value={fullNameInput}
            onChange={(e) => setFullNameInput(e.target.value)}
          />

          <TextField
            autoFocus
            fullWidth
            type="email"
            margin="dense"
            variant="outlined"
            label="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />

          <TextField
            autoFocus
            fullWidth
            type="date"
            margin="dense"
            variant="outlined"
            value={appointmentDateInput}
            onChange={(e) => setAppointmentDateInput(e.target.value)}
          />

          <TextField
            fullWidth
            select
            defaultValue={appointmentTypeInput}
            // helperText="Please select your appointment type"
            value={appointmentTypeInput}
            onChange={(e) => setAppointmentTypeInput(e.target.value)}
            sx={{ marginTop: '15px' }}
          >
            {AppointmentType.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
            Please select your appointment type
          </Typography>
          <TextField
            fullWidth
            select
            defaultValue={appointmentTimeInput}
            // helperText="Please select your appointment time"
            InputLabelProps={{ shrink: true }}
            value={appointmentTimeInput}
            onChange={(e) => setAppointmentTimeInput(e.target.value)}
            sx={{ marginTop: '15px' }}
          >
            {finalTimeArray.length > 0 &&
              finalTimeArray.map((option, key) => (
                <MenuItem key={key} value={option.startTime}>
                  {`${option.startTime}-${option.endTime}`}
                </MenuItem>
              ))}
          </TextField>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
            Please select your appointment time
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmitAppointment} variant="contained">
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
      <ActionBox actionBox={actionBox} data={data} dialog={dialog} />
      <ProviderSelectionPopup
        data={id}
        open={openDialogBox}
        close={() => setOpenDialogBox(false)}
      />
    </Container>
  );
}
