import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert, Paper } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null); // For OAuth alerts
  const { signIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/user/login/${email}/${password}`);
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('email', user.email); // Store email in localStorage
        signIn(user); // Update the user context
        setAlert(<Alert severity="success">Sign in Successful!</Alert>);
        setOpen(true);
        setTimeout(() => {
          navigate('/ho'); // Navigate to Profile page
        }, 2000); // Navigate after 2 seconds
      } else {
        console.log('Invalid credentials');
        setAlert(<Alert severity="error">Invalid credentials, please try again.</Alert>);
      }
    } catch (error) {
      console.error('There was an error signing in!', error);
      setAlert(<Alert severity="error">Error signing in, please try again later.</Alert>);
    }
  };

  const handleOAuthSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      console.log('OAuth login successful:', decoded);
      localStorage.setItem('email', decoded.email); // Store OAuth email in localStorage
      signIn(decoded); // Update the user context with OAuth user
      setAlert(<Alert severity="success">OAuth login successful!</Alert>);
      setOpen(true);
      setTimeout(() => {
        navigate('/ho'); // Navigate to Profile page
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error("OAuth login failed:", error);
      setAlert(<Alert severity="error">OAuth login failed. Please try again.</Alert>);
    }
  };

  const handleOAuthError = () => {
    console.log("OAuth login failed");
    setAlert(<Alert severity="error">OAuth login failed. Please try again.</Alert>);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setAlert(null); // Close OAuth alert as well
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="8px"
        padding="20px"
        marginTop="50px"
        bgcolor="#f9f9f9"
      >
        <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            component="form"
            onSubmit={handleSignIn}
          >
            <LockIcon fontSize="large" color="primary" />
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            {alert && <Box sx={{ mb: 2 }}>{alert}</Box>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Sign In
            </Button>
            <br />
            <GoogleLogin
              onSuccess={handleOAuthSuccess}
              onError={handleOAuthError}
              style={{ width: '100%', marginTop: '10px' }} // Adjust width for alignment
            />
            <Button
              component={Link}
              to="/re"
              fullWidth
              variant="text"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Paper>
      </Box>
      <Snackbar open={open || alert} autoHideDuration={6000} onClose={handleClose}>
        {alert && (
          <Alert onClose={handleClose} severity={alert.props.severity}>
            {alert.props.children}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default SignIn;
