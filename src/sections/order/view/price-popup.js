import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { Avatar, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { Autocomplete, Select, Grid, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { useSnackbar } from "src/components/snackbar";

// auth
import { useAuthContext } from "src/auth/hooks";
import customAxios from "src/utils/customAxios";
import axiosInstance from "src/utils/axios";
import axios from 'axios'

export default function PricePopup({ referralDialog, handleClose, data }) {
  const { user } = useAuthContext();

  const {token} = user



  const [errorMsg, setErrorMsg] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const [providersData, setProvidersData] = useState([]);

  const RegisterSchema = Yup.object().shape({
    // firstName: Yup.string().required("First name required"),
    // lastName: Yup.string().required("Last name required"),
  });

  const defaultValues = {
    category: "cardiology",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (RHFdata) => {
    // Construct the payload with updated prices and calculate total fee
    let totalFee = 0;
    const updatedMedications = data.medications.map((medication) => {
      const price = parseFloat(RHFdata[`medication_${medication._id}`]) || 0;
      totalFee += price;
      return {
        id: medication._id,
        price: price
      };
    });
  
    const requestObject = {
      items: updatedMedications,
      totalFee: totalFee
    };
  
    try {
      await axios.patch(`https://abibiman-api.onrender.com/prescriptions/admin/update-cost/${data.id}`, requestObject, {
        headers: {
          Authorization:  `Basic ${token}`
        }
      })
      .then((res) => {
        enqueueSnackbar("Prices updated successfully");
        handleClose();
      })
      .catch(err => {
        setErrorMsg(err.message || "Error updating prices");
      });
    } catch (error) {
      reset();
      enqueueSnackbar("Error Sending Data, Please try again");
    }
  });
  


  return (
    <Dialog
      open={referralDialog}
      onClose={handleClose}
      sx={{
        // width: "425px",
        margin: "0 auto",
        "@media (max-width: 425px )": {
          maxWidth: "100%",
          minWidth: "100%",
        },
      }}
    >
      <Stack
        sx={{
          padding: "20px 20px 10px",
          width: "425px",
          "@media (max-width: 425px )": {
            padding: "20px 10px",
          },
        }}
      >
        <Typography variant="h5" textAlign={"center"} sx={{ mb: "15px" }}>
         Order #{data.orderNumber}
        </Typography>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            {data.medications && data.medications.map((medication, index) => (
            <RHFTextField
              key={index}
              name={`medication_${medication._id}`}
              label={medication.drug}
              multiline
            />
          ))}

            <RHFTextField
              name="discount"
              label="Discount"
              multiline
            />


            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {data.medications.length > 0?"Set Prices":"Set Price"}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Stack>
    </Dialog>
  );
}
PricePopup.propTypes = {
  referralDialog: PropTypes.bool,
  data: PropTypes.object,
  handleClose: PropTypes.func,
};
