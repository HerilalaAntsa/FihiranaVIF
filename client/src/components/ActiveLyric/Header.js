import React from 'react';
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography } from '@mui/material';
import LyricAvatar from './BadgeAvatar';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import logo from '../../images/fond-logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 89,
    marginBottom: 34,
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'space-between',
    width: '100%'
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    marginLeft: 14,
    marginRight: 14
  },
  artist: {
    textAlign: "left",
    fontSize: 40,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    flex: 1,
    color: "gray"
  },
  menuIconPlus: {
    display: 'flex',
    marginLeft: "auto",
    fontSize: 50,
    justify: "space-between",
    color: 'green',
    height: '100%',
    '&:hover': {
      cursor: 'grab',
    },
  },
  logo: {
    height: 60,
    width: 60,
  },
}));

const Header = ({ lyric, activeDiaporama }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Box style={{ display: 'flex' }}>
          {lyric.artists &&
            lyric.artists.photoUrl != '' ?
            <LyricAvatar
              title={lyric.artists.name}
              photoUrl={lyric.artists.photoUrl}
              sidebar={false}
            />
            :
            <img
              src={logo}
              alt="vif_logo"
              className={classes.logo}
            />
          }
          <Box className={classes.title}>
            <Box >
              <Typography variant="h5">{lyric.title}</Typography>
            </Box>
            {lyric.artists &&
              <Box className={classes.artist}>
                <Typography >{lyric.artists.name}</Typography>
              </Box>
            }
          </Box>
        </Box>
        <Box className={classes.menuIconPlus}>
          <Button color="success" onClick={() => activeDiaporama(lyric)} variant="outlined" startIcon={<SlideshowIcon />}>
            Projeter
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
