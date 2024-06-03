import React from 'react';
import { AppBar, Toolbar, Button, Typography, backdropClasses } from '@mui/material';
import { main_route, tool_route, about_route } from "../Routing/Routes";
import { Link } from 'react-router-dom';
import "../styles/styles.css";

const navbarStyle = {
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem 3rem 1rem', // Add padding
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: '"Source Sans 3"',
    fontSize: 18
  },
  navItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    color: 'white', // Change color to white
    fontFamily: '"Source Sans 3"',
    fontSize: 18
  },
};

const barStyle = {
    background: 'rgb(2,0,36)',
    background: 'linear-gradient(90deg, rgba(16,11,97,1) 0%, rgba(6,13,66,1) 38%, rgba(62,22,77,1) 65%, rgba(73,19,98,1) 100%)',
}

const Navbar = () => {
  return (
    <div style={navbarStyle.root}>
      <AppBar position="static" style={barStyle}>
        <Toolbar>
          {/* Site Title */}
          <Typography style={navbarStyle.title}>
            <Button component={Link} to={main_route} color="inherit" style={navbarStyle.title}>
                Ⓝ My Normalization Tool
            </Button>
          </Typography>

          {/* Navigation Links */}
          <div style={navbarStyle.navItems}>
            <Button component={Link} to={tool_route} style={navbarStyle.navButton}>
              Калькулятор
            </Button>
            <Button component={Link} to={about_route} style={navbarStyle.navButton}>
              Алгоритм
            </Button>
          </div>

          {/* Sign Up Button (Optional) */}
          {/* You can uncomment this section if you want a sign-up button */}
          {/* <Button component={Link} to="/sign-up" color="inherit" style={navbarStyle.navButton}>
            Sign Up
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
