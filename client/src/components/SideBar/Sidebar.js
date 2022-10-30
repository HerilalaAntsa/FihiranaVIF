import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Search } from './index';
import { makeStyles } from '@mui/styles';
import LyricContent from './LyricContent';
import Footer from './Footer';

const useStyles = makeStyles(() => ({
  root: {
    // paddingLeft: 21,
    // paddingRight: 21,
    flexGrow: 1,
    transition: "width 0.3s ease-in-out",
    paddingTop: "28px",
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 15,
  },
  content: {
    height: "60vh",
    overflowY: "scroll",
  },
  sidenavClosed: {
    composes: 'sidenav',
    transition: "width 0.3s ease-in-out",
    width: 60,
    backgroundColor: "black"
  }
}));

const Sidebar = ({
  handleChange,
  searchTerm,
  lyrics = [],
  setActiveParole,
  isExpanded
}) => {
  const classes = useStyles();

  useEffect(() => {}, [isExpanded]);
  
  return (
    <>
      {
        isExpanded ?
          <Box className={isExpanded ? classes.root : classes.sidenavClosed
          } >
            <Search handleChange={handleChange} />
            <div className={classes.content}>
              {lyrics
                // .filter((lyric) =>
                //   lyric.title.includes(searchTerm)
                // )
                .map((lyric) => {
                  return (
                    <LyricContent
                      lyric={lyric}
                      key={lyric.id}
                      setActiveParole={setActiveParole}
                    />
                  );
                })}
            </div>

            <Footer />
          </Box >
          :
          <></>
      }
    </>
  );
};

export default Sidebar;
