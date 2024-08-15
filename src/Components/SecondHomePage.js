import React, { useState } from 'react';
import {
  AppBar, Box, Toolbar, Typography, IconButton, Avatar, Button, Tooltip, MenuItem, Menu, Container, TextField, Grid, FormControl, InputLabel, Select, Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Carousel from './Carousel';

const pages = [
  { name: 'Home', link: '/ho' },
  { name: 'Why Us', link: '/wh' },
  { name: 'Rent Your Vehicle', link: '/ca' }
];

const settings = [
  { name: 'Profile', link: '/pp' },
  { name: 'Account', link: '#' },
  { name: 'Dashboard', link: '#' },
  { name: 'Logout', link: '/si' }
];

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
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.link}
                sx={{
                  my: 2, color: 'white', display: 'block',
                  '&:hover': { backgroundColor: 'lightgray', color: 'black' }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" />
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
                <MenuItem key={index} onClick={handleCloseUserMenu} component={Link} to={setting.link}>
                  <Typography textAlign="center">{setting.name}</Typography>
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
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some(field => field === '')) {
      setAlert('Please fill out all the fields.');
      return;
    }

    setAlert(null);
    console.log('Form Data Submitted:', formData);
    const vehiclePaths = { Bike: '/be', Car: '/ce', Bicycle: '/bie' };
    navigate(vehiclePaths[formData.city] || '/');
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {alert && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {alert}
          </Alert>
        )}
        <Box sx={{ padding: 3, borderRadius: 1, boxShadow: 20, width: '100%', maxWidth: 800, textAlign: 'center', backgroundColor: 'white', border: '2px solid cadetblue' }}>
          <Typography component="h1" variant="h5">
            Renting a Vehicle
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {['name', 'phone', 'age'].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    type={field === 'age' ? 'number' : 'text'}
                    inputProps={field === 'age' ? { min: 0 } : {}}
                  />
                </Grid>
              ))}
              {['pickUpDate', 'dropOffDate'].map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    fullWidth
                    label={field.split(/(?=[A-Z])/).join(' ')}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              ))}
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
                    {['Bike', 'Car', 'Bicycle'].map((type, idx) => (
                      <MenuItem key={idx} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'cadetblue', color: 'white', '&:hover': { backgroundColor: 'darkcyan' } }}>
              Submit
            </Button>
            <Button fullWidth variant="contained" component={Link} to="/nc" sx={{ mt: 3, mb: 2, backgroundColor: 'cadetblue', color: 'white', '&:hover': { backgroundColor: 'darkcyan' } }}>
              Explore Vehicles
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '100%', mt: 4 }}>
          <Grid container spacing={3}>
            {[
              {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa54t4dSqnC6bU4iFGvTRI1S0rJ600AM11fQ&s",
                text: "Find the perfect ride. Search through thousands of rides all over the world for one near you. Search by city, zip code, ride type, available dates, and more."
              },
              {
                src: "https://th.bing.com/th/id/OIP.pFJc7xmRipI4Qwl85EiWDwAAAA?rs=1&pid=ImgDetMain",
                text: "Book a ride & pay. Check the available dates and put in a request or two and message the owner. Then book & pay through Spinlister. It’s cashless and convenient."
              },
              {
                src: "https://c1.wallpaperflare.com/preview/231/225/87/america-classic-car-car-vintage.jpg",
                text: "Get the ride and have fun. Make up to $500/month by sharing your bike, surfboard, SUP, snowboard or skis with travelers, racers, and enthusiasts."
              }
            ].map((item, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <Box sx={{ textAlign: 'center' }}>
                  <img src={item.src} alt={`Vehicle ${idx + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {item.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

// Footer Component
function Footer() {
  return (
    <Box sx={{ backgroundColor: 'cadetblue', color: 'white', py: 5, px: 3, mt: 5, textAlign: 'center' }}>
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
            {[
              { icon: <Facebook />, link: "https://www.facebook.com" },
              { icon: <Twitter />, link: "https://www.twitter.com" },
              { icon: <Instagram />, link: "https://www.instagram.com" },
              { icon: <LinkedIn />, link: "https://www.linkedin.com" }
            ].map((social, idx) => (
              <IconButton key={idx} color="inherit" href={social.link} target="_blank">
                {social.icon}
              </IconButton>
            ))}
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

// Main App Component
function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Carousel />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default App;
