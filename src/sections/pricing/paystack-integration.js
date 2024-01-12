import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  MenuItem,
} from '@mui/material';
import PaystackPop from '@paystack/inline-js';
import { toast } from 'react-toastify';

import { AuthContext } from 'src/auth/context/jwt';
import customAxios from 'src/utils/customAxios';

export default function PaystackIntegration({ price, openDialog, setOpenDialog, subscription }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [packageDuration, setPackageDuration] = useState('1');
  const [amount, setAmount] = useState(packageDuration * price);
  const [subscriptionInput, setSubscriptionInput] = useState(subscription);
  const [emailAddress, setEmailAddress] = useState('');
  const [transactionDetails, setTransactionDetails] = useState('');

  // User details
  const { user } = useContext(AuthContext);
  const { token, userID } = user || {};

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  const durationArray = [
    { name: '1 month', value: 1 },
    { name: '3 months', value: 3 },
    { name: '6 months', value: 6 },
    { name: '12 months', value: 12 },
  ];
  const handleCloseDialog = () => setOpenDialog(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user || !token || !userID) {
      console.error('User details are not available.');
      return;
    }
    const subscriptionObject = {
      userID,
      package: subscriptionInput,
      packageCost: price,
      packageDuration,
      amountPaid: amount,
      paymentDate: formattedDate,
      startDate: formattedDate,
    };
    try {
      // setting and sending subscription details to backend
      const data = await customAxios.post('/subscription', subscriptionObject);

      console.log(data);

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'pk_test_fbadd54b00942d1c274d2c3e1b447f5be9f02e85',
        amount,
        email: emailAddress,
        firstname: firstName,
        lastname: lastName,
        onSuccess(transaction) {
          // const message = `Payment Complete! Reference ${transaction.reference}`;
          setTransactionDetails(transaction);
          toast.success('Payment successful');
        },
      });

      handleCloseDialog();

      setFirstName('');
      setLastName('');
      setPackageDuration('1');
      setAmount('');
      setSubscriptionInput('');
      setEmailAddress('');
      setTransactionDetails('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSubscriptionInput(subscription);
  }, [subscription]);

  useEffect(() => {
    setAmount(packageDuration * price);
  }, [packageDuration, price]);

  return (
    <Dialog open={!!openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Proceed to Payment</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3 }}>Please fill the form below</Typography>

        <TextField
          autoFocus
          fullWidth
          type="text"
          margin="dense"
          variant="outlined"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          autoFocus
          fullWidth
          type="text"
          margin="dense"
          variant="outlined"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
          type="text"
          margin="dense"
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
          value={subscriptionInput}
          // onChange={(e) => setSubscriptionInput(e.target.value)}
          readOnly
        />

        <TextField
          fullWidth
          select
          defaultValue="Time"
          helperText="Please select package duration"
          sx={{ marginTop: 1 }}
          value={packageDuration}
          onChange={(e) => setPackageDuration(e.target.value)}
        >
          {durationArray.length > 0 &&
            durationArray.map((option, key) => (
              <MenuItem key={key} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          autoFocus
          fullWidth
          type="text"
          margin="dense"
          helperText="Amount to be paid"
          variant="outlined"
          value={`$${amount}`}
          // onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handlePayment} variant="contained">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PaystackIntegration.propTypes = {
  setOpenDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  price: PropTypes.number,
  subscription: PropTypes.string,
};
