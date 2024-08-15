import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, Button, AppBar, Toolbar, IconButton, Avatar, Tooltip, Menu, MenuItem, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function BikeExplore() {
  const [bicycles, setBicycles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch('http://localhost:8080/bike');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBicycles(data);
      } catch (error) {
        console.error('Error fetching bicycles:', error);
      }
    };

    fetchBikes();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRentNow = (bicycle) => {
    navigate('/co', { state: { veaddress: bicycle.address } });
  };

  const filteredBicycles = bicycles.filter(bicycle =>
    bicycle.address && bicycle.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Vehicle Details
          </Typography>
          <TextField
            label="Search by Address"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              mb: 4,
              width: { xs: '100%', sm: '75%', md: '50%' },
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'cadetblue',
                  borderRadius: '8px',
                },
                '&:hover fieldset': {
                  borderColor: 'cadetblue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'cadetblue',
                },
              },
            }}
          />
          <Grid container spacing={4}>
            {filteredBicycles.map((bicycle, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', sm: 300 } }}
                    image={bicycle.url || 'default-image-url.jpg'}
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
                      <Typography variant="body2" color="text.secondary"><b></b>
                        {bicycle.plate || 'No Plate Number Provided'} 
                      </Typography>
                      <Typography variant="body2" color="text.secondary"><b></b>
                        {bicycle.email || 'No Email Provided'} 
                      </Typography>
                      <Typography variant="body2" color="text.secondary"><b>Address:</b>
                        {bicycle.address || 'No Address Provided'} 
                      </Typography>
                      <Typography variant="subtitle1" component="div" sx={{ mt: 1 }}>
                        Price per Day: {bicycle.price || 'N/A'} 
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {bicycle.available ? "Available for rent" : "Currently not available"}
                    </Typography>

                    {/* <Button variant="contained" color="primary" disabled={!bicycle.available} onClick={() => handleRentNow(bicycle)}>
                      Rent Now
                    </Button> */}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="contained" color="primary" onClick={() => handleRentNow(bicycle)}>
                        Book Now
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
    { label: 'Home', path: '/ho' },
    { label: 'Why Us', path: '/wh' },
    { label: 'Rent your Vehicle', path: '/ca' }
  ];

  const settings = [
    { label: 'Profile', path: '/pp' },
    { label: 'Account', path: '/ac' },
    { label: 'Dashboard', path: '/db' },
    { label: 'Logout', path: '/si' }
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: 'cadetblue' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
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
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
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
                <MenuItem key={index} component={Link} to={setting.path} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
          </Menu>
         </Box>
        </Toolbar>
       </Container>
    </AppBar>
  );
}

export default BikeExplore;
