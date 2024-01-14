import { useContext, useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { AuthContext } from 'src/auth/context/jwt';
// _mock
import { _appFeatured, _appointments } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import customAxios from 'src/utils/customAxios';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
//
import AppWelcome from '../welcome';
import AppAppointments from '../appointments';
import FromOurBlog from '../from-our-blog';
import DeviceUsage from '../device-usage';
import BloodPressureCard from '../blood-pressure-card';
import AppWidgetSummary from '../app-widget-summary';
import { useTheme } from '@mui/material/styles';
import newOrder from 'src/assets/images/checklist.png'
import pendingOrder from 'src/assets/images/clockwise.png'
import emergency from 'src/assets/images/alarm.png'
import delayed from 'src/assets/images/clock.png'
import completed from 'src/assets/images/checked.png'
import waitOrder from 'src/assets/images/wait.png'
import { de } from 'date-fns/locale';


const demoAPI = [
  {
    orderNo: 'LO-21341',
    patient: "John Ansah",
    doctor: 'Dr. Phyllis Dwamenah',
    reqDate: '2023-12-22',
    orderDate: '2023-12-10',
    orderType: 'EKG',
    priority: 'Emergency',
    fee: '100',
    status: 'Order Confirmed',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
  },
  {
    orderNo: 'LO-21342',
    patient: "Alice Johnson",
    doctor: 'Dr. Mark Benson',
    fee: '100',
    orderDate: '2023-12-10',
    reqDate: '2023-12-21',
    orderType: 'Blood Test',
    priority: 'Routine',
    status: 'Awaiting Confirmation',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  },
  {
    orderNo: 'LO-21343',
    patient: "Michael Smith",
    doctor: 'Dr. Susan Lee',
    reqDate: '2023-12-20',
    orderType: 'MRI',
    orderDate: '2023-12-10',
    priority: 'Urgent',
    fee: '100',
    status: 'Awaiting Confirmation',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  },
  {
    orderNo: 'LO-21344',
    patient: "Karen Davis",
    doctor: 'Dr. John Okeke',
    reqDate: '2023-12-19',
    orderType: 'CT Scan',
    fee: '100',
    orderDate: '2023-12-10',
    priority: 'Emergency',
    status: 'Awaiting Confirmation',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  },
  {
    orderNo: 'LO-21345',
    patient: "Robert Brown",
    doctor: 'Dr. Angela Yen',
    reqDate: '2023-12-18',
    fee: '100',
    orderType: 'Ultrasound',
    orderDate: '2023-12-10',
    priority: 'Routine',
    status: 'Awaiting Confirmation',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  },
  {
    orderNo: 'LO-21346',
    patient: "Linda Green",
    doctor: 'Dr. Mohammed Alvi',
    fee: '100',
    reqDate: '2023-12-17',
    orderDate: '2023-12-10',
    orderType: 'X-Ray',
    priority: 'Urgent',
    status: 'Awaiting Confirmation',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  },
  {
    orderNo: 'LO-21347',
    patient: "Emily Clark",
    doctor: 'Dr. Lisa Chang',
    fee: '100',
    reqDate: '2023-12-16',
    orderType: 'Biopsy',
    orderDate: '2023-12-09',
    priority: 'Emergency',
    status: 'Awaiting Confirmation',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  },
  {
    orderNo: 'LO-21348',
    patient: "James Wilson",
    doctor: 'Dr. Kevin Schwartz',
    reqDate: '2023-12-15',
    fee: '100',
    orderDate: '2023-12-08',
    orderType: 'Echocardiogram',
    priority: 'Routine',
    status: 'Awaiting Confirmation',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  },
  {
    orderNo: 'LO-21349',
    patient: "Jessica Miller",
    doctor: 'Dr. Amy Gupta',
    orderDate: '2023-12-09',
    fee: '100',
    reqDate: '2023-12-14',
    orderType: 'PET Scan',
    priority: 'Urgent',
    status: 'Order Confirmed',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',
    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  },
  {
    orderNo: 'LO-21350',
    patient: "William Turner",
    orderDate: '2023-12-10',
    fee: '100',
    doctor: 'Dr. Carlos Hernandez',
    reqDate: '2023-12-13',
    orderType: 'Mammogram',
    priority: 'Emergency',
    status: 'Order Confirmed',
    patientEmail: 'something@email.com',
    patientPhone: '0232004242',
    doctorEmail: 'doctor@email.com',
    doctorPhone: '0232004242',    gender: 'male',
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "

  }
];



// ----------------------------------------------------------------------

export default function OverviewAppView() {

  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const settings = useSettingsContext();

  

  const getAllUserAppointments = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await customAxios.get(`/appointments/user/${user?.userID}`);

      setTableData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUserAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
      <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="New Orders"
            percent={2.6}
            total={17}
            im = {newOrder}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Order In Progress"
            im = {waitOrder}
            percent={0.2}
            total={12}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>


        <Grid xs={12} md={4}>
          <AppWidgetSummary
            im={completed}
            title="Completd Orders"
            percent={-0.1}
            total={34}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>



 




        <Grid xs={12} lg={12}>
          <AppAppointments
            title="Emergency Orders"
            tableData={demoAPI}
            tableLabels={[
              { id: 'id', label: 'OrderID' },
              { id: 'pat', label: 'Patient' },
              { id: 'dat', label: 'Date (YYYY-MM-DD)' },
              { id: 'typ', label: 'Order Type' },
              { id: 'prio', label: 'Priority' },

            ]}
          />
        </Grid>


      </Grid>
    </Container>
  );
}
