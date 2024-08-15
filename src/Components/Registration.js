import React, { useState } from 'react';
import './Registration.css';
import { Link } from 'react-router-dom';
import { Alert, Box } from '@mui/material'; 
import LockIcon from '@mui/icons-material/Lock';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Registration successful:', data);
        setAlert(<Alert severity="success">Registration successful! Sign in to continue.</Alert>);
      } else {
        console.error('Registration failed:', data);
        setAlert(<Alert severity="error">Registration failed. Please try again.</Alert>);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert(<Alert severity="error">An error occurred. Please try again.</Alert>);
    }
  };

  return (
    <div className="ui">
      <div className="registration-container">
        <LockIcon 
          sx={{ 
            fontSize: 40, 
            color: 'cadetblue' 
          }}
        />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {alert && <Box sx={{ mb: 2 }}>{alert}</Box>}
          
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="register-button">Sign Up</button>
          
          <br />
          
          <Link to="/si" className="signin-link">Already have an account? Sign in</Link>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
