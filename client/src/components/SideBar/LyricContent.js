import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 8,
        height: 80,
        boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            cursor: 'grab',
        },
    },
    content: {
        textAlign: "left"
    },
    sequencebox:{
        flex: 0.3,
    },
    title: {
        fontWeight: "bold",
        letterSpacing: -0.2,
    },
    artist: {
        fontSize: 12,
        color: "#9CADC8",
        letterSpacing: -0.17,
    },
    sequence: {
        marginLeft: "auto",
        color: "#9CADC8",
        letterSpacing: -0.17,
    },
    chevron: {
        marginLeft: "auto"
    }
}));

const LyricContent = ({ lyric, setActiveParole }) => {
    const classes = useStyles();

    const handleClick = async (lyric) => {
        await setActiveParole(lyric);
    };

    return (
        <Box onClick={() => handleClick(lyric)} className={classes.root}>
            <Box className={classes.sequencebox}>
                <Typography className={classes.sequence}>
                    {lyric.sequence}
                </Typography>
            </Box>
            <Box className={classes.content}>
                <Typography className={classes.title}>
                    {lyric.title}
                </Typography>
                <Typography className={classes.artist}>
                    {lyric.artists?.name}
                </Typography>
            </Box>
            <ChevronRightIcon className={classes.chevron} />
        </Box>
    );
};

export default LyricContent;
