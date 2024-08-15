import React, { useState } from 'react';
import {
  AppBar, Box, Toolbar, Typography, IconButton, Avatar, Button, Tooltip, MenuItem, Menu, Container, TextField, Grid, FormControl, InputLabel, Select, Alert
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
function WhyUs() {
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

  const pages = [<Link to="/ho" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>, 'Why us',
    <Link to="/ca" style={{ textDecoration: 'none', color: 'inherit' }}>Rent Your Vehicle</Link>];
  const settings = [
    <Link to='/pr' style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>,
    'Account',
    'Dashboard',
    <Link to='/si' style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link>
  ];

  return (
    <div>
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
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <img
            src='https://images.unsplash.com/photo-1455641374154-422f32e234cd?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZSUyMHJlbnRhbHxlbnwwfHwwfHx8MA%3D%3D'
            style={{ width: '100%', height: '280px', objectFit: 'cover' }}
            alt="Bicycle Rental"
          />
          <Typography variant="h4" sx={{ mt: 2,color:'cadetblue' }}>
           <b>Why Choose Us?</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}><h5>
            We offer the best rental services for bicycles, ensuring quality, affordability, and convenience.
         </h5> </Typography>
          <Typography variant="h4" sx={{ mt: 2,color:'cadetblue' }}>
         <b> Lowest price Guarantee</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}><h5>
          Why we do choose relax rent bikes, they are providing very quality and well maintained bikes. We are provide recent models stating from 2017 to 2019 bikes. We have lot of different type of bikes you can choose your dream bikes.
       </h5>   </Typography>
          <Typography variant="h4" sx={{ mt: 2,color:'cadetblue' }}>
         <b>Roadside Assistance</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}><h5>
          Also they support road side assistance round the clock, which means they give confidence to you travel a lot.      
           </h5>   </Typography>
          <Typography variant="h4" sx={{ mt: 2,color:'cadetblue' }}>
         <b>100 % Money back Guarantee</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}><h5>
          In case, We could not match your expectations, Just ask and we shall refund you 100 % . Yes that’s a promise we always keep above all.

Benefits For Customers.           </h5>   </Typography>
          <Typography variant="h4" sx={{ mt: 2,color:'cadetblue' }}>
         <b>Benefits For Customers</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}><h5>
          We have distinctly listed all the bikes with their specifications which makes it easy to compare for best prices and best deals.
Under certain specified conditions, we also provide discount coupons to our customers. You can rent your dream bikes for a small fee and enjoy your ride.
We have consistently been serving our customers beyond their expectations levels.
Our quality customer service has enabled us develop long-term relationship with our customers.
           </h5>   </Typography>
          <Typography variant="h2" sx={{ mt: 2,color:'cadetblue',
    mt: 2,
    color: 'cadetblue',
    fontFamily: 'Fantasy' // Change this to your desired font family
  }}>
        <br></br> <b>Feel Relax !</b>
          </Typography>
        </Box>
      </Container>
      
      <Footer />
    </div>
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

export default WhyUs;
