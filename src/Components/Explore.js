import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, Button, AppBar, Toolbar, IconButton, Avatar, Tooltip, Menu, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function Explore() {
  const [bicycles, setBicycles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBicycles = async () => {
      try {
        const response = await fetch('http://localhost:8080/vehicle');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging log
        setBicycles(data);
      } catch (error) {
        console.error('Error fetching bicycles:', error);
      }
    };

    fetchBicycles();
  }, []);

  const handleRentNow = (bicycle) => {
    navigate('/booking', { state: { bicycle } });
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Vehicle Details
          </Typography>
          <Grid container spacing={4} direction="column">
            {bicycles.map((bicycle, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', sm: 200 } }}
                    image={bicycle.image || 'default-image-url.jpg'}
                    alt={bicycle.name || 'Bicycle Image'}
                  />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                    <Box>
                      <Typography variant="h6" component="div">
                        {bicycle.name || 'No Name Provided'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {bicycle.description || 'No Description Provided'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary"><b>Phone Number:</b>
                        {bicycle.number || 'No Phone Number Provided'}
                      </Typography>
                      <Typography variant="subtitle1" component="div" sx={{ mt: 1 }}>
                        Price per Day: {bicycle.price || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="contained" color="primary" disabled={!bicycle.available} onClick={() => handleRentNow(bicycle)}>
                        Rent Now
                      </Button>
                      <Button variant="outlined" color="primary">
                        Add to Wishlist
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

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
    <Link to="/ho" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>,
    <Link to="/wh" style={{ textDecoration: 'none', color: 'inherit' }}>Why us</Link>,
    <Link to="/ve" style={{ textDecoration: 'none', color: 'inherit' }}>Rent your Vehicle</Link>
  ];

  const settings = [
    <Link to="/pp" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>,
    'Account',
    'Dashboard',
    <Link to="/si" style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link>
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
  );
}

export default Explore;
