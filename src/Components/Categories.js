import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Avatar, Grid, Button, Tooltip, MenuItem, Menu, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './Categories.css'; // Import your CSS file

// Categories Component
function Categories() {
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
    <Link to="/ho" className="nav-link">Home</Link>,
    <Link to="/wh" className="nav-link">Why us</Link>,
    'Rent Your Vehicle'
  ];

  const settings = [
    <Link to="/pp" className="nav-link">Profile</Link>,
    'Account',
    'Dashboard',
    <Link to="/si" className="nav-link">Logout</Link>
  ];

  return (
    <>
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
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
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
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>


      <Box sx={{ width: '100%', mt: 4 }}>
      <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>Select Categories</Typography>
      <br></br><br></br>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src="https://www.royalenfield.com/content/dam/royal-enfield/india/header/webp/continental-gt.webp"
                alt="Bicycle 1"
                className="vehicle-image"
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                <b>Bikes</b>
                <br />
                <Link to='/bb' className="nav-link">
                  <Button variant="contained" className="hover-button">Rent Your Bike</Button>
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSew2XIKaGXY9d4arndTyAPYHTdolTfMgcjmA&s"
                alt="Bicycle 2"
                className="vehicle-image"
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                <b>Bicycles</b>
                <br />
                <Link to='/bibo' className="nav-link">
                  <Button variant="contained" className="hover-button">Rent Your Bicycle</Button>
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src="https://media.zigcdn.com/media/content/2023/Sep/cover_64f8186847e8c.jpg?tr=w-1200"
                alt="Bicycle 3"
                className="vehicle-image"
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                <b>Cars</b>
                <br />
                <Link to='/cb' className="nav-link">
                  <Button variant="contained" className="hover-button">Rent Your Car</Button>
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Categories;
