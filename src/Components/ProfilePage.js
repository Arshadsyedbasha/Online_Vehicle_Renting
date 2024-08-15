import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Paper, Button, TextField, AppBar, Toolbar, IconButton, Avatar, Tooltip, Menu, MenuItem, Grid, Divider, Alert, Snackbar
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', avatar: '' });
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/signin');
    } else {
      fetchUserProfile(email);
    }
  }, [navigate]);

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/user/${email}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setFormData({ name: userData.name, email: userData.email, password: userData.password, avatar: userData.avatar });
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setFormData({ name: user.name, email: user.email, password: user.password, avatar: user.avatar });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/user/${user.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode(false);
        localStorage.setItem('email', updatedUser.email);
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    setAlertOpen(true);
    setTimeout(() => {
      localStorage.removeItem('email');
      navigate('/signin');
    }, 2000); // 2 seconds before redirecting to sign-in page
  };

  const handleAlertClose = () => setAlertOpen(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset');

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: data.secure_url,
        }));
        setUploading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
    }
  };

  const pages = [
    { name: 'Home', link: '/' },
    { name: 'Why Us', link: '/why-us' },
    { name: 'Rent Your Vehicle', link: '/rent' },
  ];

  const settings = [
    { name: 'Profile', link: '/profile' },
    { name: 'Account', link: '/account' },
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Logout', link: '/signin' },
  ];

  if (!user) return <Typography align="center" sx={{ mt: 8 }}>Loading...</Typography>;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1c4e80', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
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
                    my: 2,
                    color: 'white',
                    display: 'block',
                    textTransform: 'uppercase',
                    '&:hover': { backgroundColor: '#1976d2', color: '#fff' },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src={formData.avatar || "https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"} />
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

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="20px"
          bgcolor="#fff"
          borderRadius={2}
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
        >
          <Avatar 
            alt="User Avatar" 
            src={formData.avatar || "https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"} 
            sx={{ width: 120, height: 120, mb: 2 }} 
          />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1c4e80' }}>
            My Profile
          </Typography>
          <Divider sx={{ width: '100%', mb: 3 }} />
          <Box mt={3} sx={{ width: '100%' }}>
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      name="password"
                      type="text" // Show password in plain text
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ mr: 2 }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="upload-avatar"
                      type="file"
                      onChange={handleUpload}
                    />
                    <label htmlFor="upload-avatar">
                      <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        disabled={uploading}
                      >
                        {uploading ? 'Uploading...' : 'Upload Avatar'}
                      </Button>
                    </label>
                  </Grid>
                </Grid>
              </form>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Name: {user.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Password: ********
                </Typography>
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Edit Profile
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <Snackbar open={alertOpen} autoHideDuration={2000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="info">
          You are being logged out.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Profile;
