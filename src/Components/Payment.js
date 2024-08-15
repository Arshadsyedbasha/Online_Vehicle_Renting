import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const { price } = location.state || { price: '' };
  const [amount, setAmount] = useState(price);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === '') {
      alert('Please enter an amount');
    } else {
      if (window.Razorpay) {
        const options = {
          key: 'rzp_test_AWrlyaXOO9ncih',
          key_secret: 'iExGzM7nCvTIo41Rk4iV9kye',
          amount: amount * 100,
          currency: 'INR',
          name: 'Rent My Ride',
          description: 'for testing purpose',
          handler: function (response) {
            alert(`Payment ID: ${response.razorpay_payment_id}`);
          },
          prefill: {
            name: 'Arshad',
            email: 'arshadsyed2804@gmail.com',
            contact: '8778729928',
          },
          notes: {
            address: 'Razorpay Corporate office',
          },
          theme: {
            color: '#3399cc',
          },
        };
        const pay = new window.Razorpay(options);
        pay.open();
      } else {
        alert('Razorpay SDK not loaded. Make sure to include the Razorpay script.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Enter Amount"
            variant="outlined"
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Pay Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Payment;
