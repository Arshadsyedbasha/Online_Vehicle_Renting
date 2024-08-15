import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Avatar, Button, Tooltip, MenuItem, Menu, Container, TextField, Grid, FormControl, InputLabel, Select, Stack, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Carousel from './Carousel';

// ResponsiveAppBar Component
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    <Button key="sign-in" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
      <Link to="/si" style={{ textDecoration: 'none', color: 'inherit' }}>Sign In</Link>
    </Button>,
    <Button key="register" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
      <Link to="/re" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
    </Button>,
  ];

  const settings = [
    <Link to="/pp" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>,
    'Account',
    'Dashboard',
    <Link to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link>,
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: 'cadetblue' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: 'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            RentMyRide
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// BookingForm Component
function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    pickUpDate: '',
    dropOffDate: '',
    city: '',
    address: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setShowAlert(true);
  };

  return (
    <Container component="main" maxWidth="lg" 
    // sx={{backgroundImage:`url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJTzLne0pf_Szwham6Su8JDOahpow3TzHSaA&s')`,backgroundSize:'cover',height:'auto'}}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            padding: 3,
            borderRadius: 1,
            boxShadow: 20,
            width: '100%',
            maxWidth: 800,
            textAlign: 'center',
            backgroundColor: 'white',
            border: '2px solid cadetblue',
          }}
        >
          <Typography component="h1" variant="h5">
            Renting a Vehicle
          </Typography>
          {showAlert && (
            <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
              <Alert variant="outlined" severity="error">
                You need to signin first.
              </Alert>
            </Stack>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  type="tel"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pick-Up Date"
                  name="pickUpDate"
                  value={formData.pickUpDate}
                  onChange={handleChange}
                  required
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Drop-Off Date"
                  name="dropOffDate"
                  value={formData.dropOffDate}
                  onChange={handleChange}
                  required
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="city-label">Select the type</InputLabel>
                  <Select
                    labelId="city-label"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Bike">Bike</MenuItem>
                    <MenuItem value="Car">Car</MenuItem>
                    <MenuItem value="Bicycle">Bicycle</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: 'cadetblue', color: 'white' }}
              >
                Submit
              </Button>
          </Box>
        </Box>

        <Box sx={{ width: '100%', mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa54t4dSqnC6bU4iFGvTRI1S0rJ600AM11fQ&s"
                  alt="Bicycle 1"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Find the perfect ride
                  <br />
                  Search through thousands of rides all over the world for one near you. Search by city, zip code, ride type, available dates, and more.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="https://th.bing.com/th/id/OIP.pFJc7xmRipI4Qwl85EiWDwAAAA?rs=1&pid=ImgDetMain"
                  alt="Bicycle 2"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Book a ride & pay
                  <br />
                  Check the available dates and put in a request or two and message the owner. Then book & pay through Spinlister. It’s cashless and convenient.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="https://c1.wallpaperflare.com/preview/231/225/87/america-classic-car-car-vintage.jpg"
                  alt="Bicycle 3"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Get the ride and have fun
                  <br />
                  Make up to $500/month by sharing your bike, surfboard, SUP, snowboard or skis with travelers, racers, and enthusiasts.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

// Footer Component
function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'cadetblue',
        color: 'white',
        py: 5,
        px: 3,
        mt: 5,
        textAlign: 'center',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>Contact Us</Typography>
          <Typography variant="body2">Email: birenting@gmail.com</Typography>
          <Typography variant="body2">Phone: (123) 456-7890</Typography>
          <Typography variant="body2">Address: 123 Lane, Coimbatore - 641008</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>Follow Us</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="https://www.twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="https://www.instagram.com" target="_blank">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="https://www.linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>Subscribe to Our Newsletter</Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              sx={{
                input: { color: 'white' },
                mb: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
              }}
              InputProps={{
                style: { color: 'white' },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: 'white',
                color: 'cadetblue',
                '&:hover': { backgroundColor: 'lightgray' },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mt: 4 }}>
        © {new Date().getFullYear()} Vehicle Renting. All rights reserved.
      </Typography>
    </Box>
  );
}


// CombinedPage Component
export default function CombinedPage() {
  return (
    <div>
      <ResponsiveAppBar />
      <Carousel/>
      <BookingForm />
      <Footer />
    </div>
  );
}
