import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import config from '../../config';
import logo from '../../images/logovif.png'

const useStyles = makeStyles(() => ({
    footer: {
        marginTop: "auto"
    },
    logo: {
        width: 30
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Box className={classes.footer} >
            <Typography variant="overline" display="block" gutterBottom>
                © {(new Date().getFullYear()) + " "}
                <a href={config.linkVif}>VIF</a> Studios_
                 
                <img
                    src={logo}
                    alt="vif_logo"
                    className={classes.logo}
                />
            </Typography>
        </Box>
    );
};

export default Footer;
