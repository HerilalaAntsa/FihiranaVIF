import { makeStyles } from '@mui/styles';
import React from 'react';
import logo from './images/Ellipsis.gif'

const useStyles = makeStyles(() => ({
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '100vh'
  }
}));

const LoadingScreen = () => {

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <img src={logo} alt="loading..." />
    </div>
  );
};

export default LoadingScreen;
