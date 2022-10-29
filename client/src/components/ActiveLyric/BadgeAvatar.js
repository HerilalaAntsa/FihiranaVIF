import React from "react";
import { Box, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  profilePic: {
    height: 50,
    width: 50,
  },
  badge: {
    height: 13,
    width: 13,
    // borderRadius: "50%",
    // border: "2px solid white",
    backgroundColor: "#D0DAE9",
  },
  online: {
    backgroundColor: "#1CED84",
  },
  sidebar: {
    marginLeft: 17,
  },
}));

const LyricAvatar = ({ title, photoUrl, sidebar }) => {
  const classes = useStyles();

  return (
    <Box className={sidebar ? classes.sidebar : ""}>
      <Badge
        classes={{ badge: `${classes.badge}` }}
      >
        <img
          src={photoUrl}
          alt={title}
          className={classes.profilePic}
        />
      </Badge>
    </Box>
  );
};

export default LyricAvatar;
