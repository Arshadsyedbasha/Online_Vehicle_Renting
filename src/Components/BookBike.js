import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, IconButton, Avatar, Tooltip, Menu, MenuItem, Grid, Alert, CircularProgress } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { keyframes } from '@mui/system';
import axios from 'axios'; // Import Axios for HTTP requests

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
function ResponsiveAppBar({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu }) {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
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
                  '&:hover': { backgroundColor: 'lightgray', color: 'blue' }
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

const BikeBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    number: '',
    plate: '',
    email: '',
    url: '',
    price: '',
    address: '',
  });

  const [error, setError] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State to hold the image file

  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (error) {
      setError(null);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.number || !formData.plate || !formData.email || !formData.price || !formData.address) {
      setError('All fields are required.');
      return;
    }

    if (!imageFile) {
      setError('Please upload an image.');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      setError('Invalid price format.');
      return;
    }

    setLoading(true);

    try {
      // Upload the image to Cloudinary
      const formDataToUpload = new FormData();
      formDataToUpload.append('file', imageFile);
      formDataToUpload.append('upload_preset', 'vehicle_renting'); // Replace with your actual upload preset

      const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/vehiclerenting/image/upload', formDataToUpload);

      const imageUrl = uploadResponse.data.secure_url;

      const formattedData = {
        ...formData,
        url: imageUrl, // Use the URL from Cloudinary
        price: price
      };

      const response = await fetch('http://localhost:8080/bikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Bike added successfully:', data);
        setSuccessAlert(true);
        setFormData({ name: '', description: '', number: '', plate: '', email: '', url: '', price: '', address: '' });
        setImageFile(null); // Reset the image file
        setTimeout(() => setSuccessAlert(false), 3000);
      } else {
        console.error('Failed to add bike:', data);
        setError('Failed to add bike. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ResponsiveAppBar handleOpenUserMenu={handleOpenUserMenu} anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {successAlert && <Alert severity="success">Bike added successfully!</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box
          sx={{
            mt: 4,
            animation: `${fadeIn} 1s ease-in-out`,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Add Your Bike
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Number"
              name="number"
              fullWidth
              value={formData.number}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Plate Number"
              name="plate"
              fullWidth
              value={formData.plate}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography variant="body1">Upload Image</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: '',
                    '&:hover': { backgroundColor: 'lightgray', color: 'darkblue' },
                    color: 'white',
                  }}
                >
                  Choose File
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
              </Grid>
            </Grid>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Address"
              name="address"
              fullWidth
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            
            <Box sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton href="https://facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Typography variant="body2">© 2024 RentMyRide. All rights reserved.</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BikeBook;
