import React from 'react';
import { makeStyles } from "@mui/styles";
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex !important',
    // alignItems: 'center !important',
    // justifyContent: 'space-between',
    height: 89,
    marginBottom: 34,
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10) !important',
    backgroundColor: '#F5E6DF !important',
  },
  title: {
    fontFamily: "fantasy"
  },
  logo: {
    width: "6%",
    marginLeft: 20
  },
  menuIcon: {
    marginLeft: 20,
    '&:hover': {
      cursor: 'grab',
    },
  },
  adminButton: {
    justifyContent: 'space-between',
    marginLeft: 'auto'
  }
}));

const Header = ({
  activeAddLyric,
  handleLogout,
  user,
  handleToggler
}) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          onClick={handleToggler}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <img
          src={logo}
          alt="vif_logo"
          className={classes.logo}
          onClick={() => {
            window.history.pushState("/", "Home");
          }}
        />
        {user.id && (
          <div className={classes.adminButton}>
            <Typography>*Vous êtes en mode Admin</Typography>
            <Button onClick={activeAddLyric} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
              Ajouter une parole
            </Button>
            <Button onClick={handleLogout} variant="outlined" startIcon={<LogoutIcon />}>
              LOGOUT
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar >
    // <Box className={classes.root}>

    //   <MenuIcon
    //     className={classes.menuIcon}
    //     onClick={handleToggler}
    //   />  
    //   <img
    //     src={logo}
    //     alt="vif_logo"
    //     className={classes.logo}
    //     onClick={() => {
    //       window.history.pushState("/", "Home");
    //     }}
    //   />
    //   {/* <Typography className={classes.title}>Fihirana VIF</Typography> */}
    //   <div className={classes.adminButton}>
    //     {user.id &&
    //       <>
    //         <Typography>*Vous êtes en mode Admin</Typography>
    //         <Button onClick={activeAddLyric} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
    //           Ajouter une parole
    //         </Button>
    //         <Button onClick={handleLogout} variant="outlined" startIcon={<LogoutIcon />}>
    //           LOGOUT
    //         </Button>
    //       </>
    //     }
    //   </div>
    // </Box>
  );
};

export default Header;
