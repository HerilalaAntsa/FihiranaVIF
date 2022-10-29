import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography } from "@mui/material";
import Header from './Header';
import reactStringReplace from 'react-string-replace';
import logo from '../../images/fond-logo.png'
import EditIcon from '@mui/icons-material/Edit';
import EditLyric from '../AddLyric/EditLyric';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
    background: 'white',
    height: "85vh",
    overflow: "scroll"
  },
  lyricContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  vifContainer: {
    // width: "50vh"
  },
  logo: {
    width: "80vh"
  }
}));

const ActiveLyric = ({
  user,
  lyrics,
  activeLyric,
  activeDiaporama,
  activeEditLyric,
  putLyric,
  isEditingLyric
}) => {
  const classes = useStyles();

  const parole = lyrics && activeLyric
    ? lyrics.find(
      (lyric) => lyric.id === activeLyric.id
    )
    : null;

  return (
    <Box className={classes.content}>
      {
        isEditingLyric ?
          <EditLyric
            user={user}
            putLyric={putLyric}
            lyric={parole}
            activeEditLyric={activeEditLyric}
          />
          : parole ?
            <>
              <Header
                lyric={parole}
                activeDiaporama={activeDiaporama}
              />
              {user.id &&
                <Button onClick={activeEditLyric} startIcon={<EditIcon />}>
                  Modifier
                </Button>
              }
              <Box className={classes.lyricContainer}>
                {/* For HTML text */}
                <div dangerouslySetInnerHTML={{
                  __html: reactStringReplace(parole.content, '<p></p>', () => (
                    "<br>"
                  )).join('')
                }}>
                </div>
              </Box>
            </>
            :
            <div className={classes.vifContainer}>
              <img
                src={logo}
                alt="vif_logo"
                className={classes.logo}
              />
            </div>
      }
    </Box>
  );
};

export default ActiveLyric;
