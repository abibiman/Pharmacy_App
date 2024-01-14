import PropTypes from 'prop-types';
import { useState, useCallback ,useContext,useEffect} from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
//
import OrderDetailsInfo from '../order-details-info';
import OrderDetailsItems from '../order-details-item';
import OrderDetailsToolbar from '../order-details-toolbar';
import OrderDetailsHistory from '../order-details-history';
import { useParams } from 'react-router'
import axios from 'axios'
import { useAuthContext } from "src/auth/hooks";


// ----------------------------------------------------------------------

export default function OrderDetailsView() {
  const {id} = useParams()
  const {  user } = useAuthContext();
  const { token,facilityID } = user || {};
  const [orderData,setOrderData] = useState({})
  const [patientData,setPatientData] = useState({})
  const [doctorData,setDoctorData] = useState({})
  const [allData,setAllData] = useState({})

  useEffect(() => {
    axios.get(`https://abibiman-api.onrender.com/prescriptions/facility/details/${id}`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    })
    .then(res => {
      setAllData(res.data)
      console.log(allData)
      setOrderData(res.data.prescriptionData);
      setPatientData(res.data.patientData);
      setDoctorData(res.data.doctorData);
    })
    .catch(err => {
      console.log(err);
    })
  }, [allData, facilityID, id, token]); // Removed orderData from dependencies



  const settings = useSettingsContext();


  const [status, setStatus] = useState("");

  const handleChangeStatus = useCallback((newValue) => {
    setStatus(newValue);
  }, [setStatus]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <OrderDetailsToolbar
        backLink={paths.dashboard.order.root}
        orderNumber={orderData.id}
        createdAt={orderData.datePrescribed}
        status=""
        onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              items={orderData.medications}
              taxes={0}
              shipping={orderData.deliveryFee}
              discount={0}
              subTotal={orderData.totalPrice}
              totalAmount={orderData.totalPrice}
            />

            {/* <OrderDetailsHistory history={currentOrder.history} /> */}
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <OrderDetailsInfo
            customer={doctorData}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

OrderDetailsView.propTypes = {
  id: PropTypes.string,
};
