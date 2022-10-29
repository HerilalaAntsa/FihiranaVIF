import React from "react";
import { motion } from "framer-motion";
import useObserverEffect from "./useObserverHook";
import logo from '../../images/logovif.png'
import { makeStyles } from '@mui/styles';
import { Typography } from "@mui/material";


const useStyles = makeStyles(() => ({
    logo: {
        width: 60
    },
    signature: {
        position: 'absolute',
        left: 5,
        bottom: 0
    }
}));

const drawerVar = {
    previous: {
        display: "block",
        height: ["100%", "100%"],
        width: ["0%", "0%", "100%"],
        opacity: [0, 1, 1],
        transition: {
            stiffness: 0,
            duration: 0.2,
            delay: 0.01
        }
    },
    next: {
        display: "block",
        width: ["0%", "0%", "100%"],
        opacity: [0, 1, 1],
        transition: {
            stiffness: 0,
            duration: 0.2,
            delay: 0.01
        }
    },
    hidden: {
        display: "none"
    },
    visible: {
        display: "none"
    }
};

const sectionVar = {
    visible: {
        opacity: 1,
        y: 0
    },
    hidden: {
        opacity: 0,
        y: 0
    },
    next: {
        opacity: 0.6,
        duration: 0.3
    }
};

const Section = ({ text, MAIN_DELAY, idSection, artist }) => {
    const { ref, variant } = useObserverEffect(MAIN_DELAY, true);
    const classes = useStyles();

    return (
        <motion.section
            ref={ref}
            animate={variant}
            variants={sectionVar}
            id={"section" + idSection}
        >
            {text}
            {/* <p>
                {artist && artist.name}
            </p> */}
            <motion.div className="drawer" animate={variant} variants={drawerVar} />

            <Typography variant="overline" display="block" gutterBottom className={classes.signature}>
                © {(new Date().getFullYear()) + " "}
                VIF Studios
                <img
                    src={logo}
                    alt="vif_logo"
                    className={classes.logo}
                />
            </Typography>
        </motion.section>
    );
};

export default Section;
