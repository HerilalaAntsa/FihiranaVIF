import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SidebarContainer } from './SideBar';
import axios from '../http-common';
import ActiveLyric from './ActiveLyric/ActiveLyric';
import AddLyric from './AddLyric/AddLyric';
import Header from './Header/Header';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        flexDirection: "row",
    },
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        // flex: "wrap",
        // alignSelf: "stretch",
    },
    sidebar: {
        flex: 1
    },
    content: {
        flex: 10,
    }
}));

const Home = ({ user, logout }) => {
    const navigate = useNavigate();

    const [lyrics, setLyrics] = useState([]);
    const [activeLyric, setActiveLyric] = useState(null);
    const [isAddingLyric, setIsAddingLyric] = useState(false);
    const [isEditingLyric, setIsEditingLyric] = useState(false);
    const [isDiaporama, setIsDiaporama] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Sidebar collapse
    // const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
    const [isExpanded, setIsExpanded] = useState(true);

    const classes = useStyles();


    const handleToggler = () => {
        if (isExpanded) {
            setIsExpanded(false);
            localStorage.setItem('sidebar-collapsed', true);
        } else {
            setIsExpanded(true);
            localStorage.removeItem('sidebar-collapsed');
        }
    }

    const addSearchedLyrics = (lyricsList) => {
        setLyrics(lyricsList);
    };

    const clearSearchedLyrics = () => {
        setLyrics((prev) => prev.filter((lyric) => lyric.id));
    };

    const setActiveParole = (lyric) => {
        setActiveLyric(lyric);
        setIsAddingLyric(false);
    };

    const activeAddLyric = () => {
        setIsAddingLyric(!isAddingLyric);
    };

    const activeEditLyric = () => {
        setIsEditingLyric(!isEditingLyric);
    };

    const activeDiaporama = (lyric) => {
        setIsDiaporama(!isDiaporama);
        const newDiapo = window.open('/diaporama', 'popUpWindow', "width=" + window.screen.availWidth + ",height=" + window.screen.availHeight);
        newDiapo.lyric = lyric;
    };

    const postLyric = async (body) => {
        try {
            const { data } = await axios.post('api/lyrics', body);
            if (data) {
                setLyrics([...lyrics, data.newLyric]);
                return true;
            }
            else return false;
        } catch (error) {
            console.error(error);
        }
    };

    const putLyric = async (body) => {
        try {
            await axios.put('api/lyrics', body).then(() => {
                const { lyricId } = body;
                const lyricTemp = null;
                setLyrics((prev) => {
                    prev.map((lyr) => {
                        if (prev.id === lyricId) {
                            const lyricCopy = {
                                ...lyr,
                                title: body.title,
                                sequence: body.sequence,
                                content: body.content,
                                artist: body.artist
                            }
                            return lyricCopy;
                        } else {
                            return lyr;
                        }
                    })
                    setActiveParole(lyricTemp);
                    return true;
                })
            });
            return false;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // when fetching, prevent redirect
        if (user?.isFetching) return;

        if (user && user.id) {
            setIsLoggedIn(true);
        }
    }, [user, navigate, isLoggedIn]);

    useEffect(() => {
        try {
            const fetchLyrics = async () => {
                const { data } = await axios.get('api/lyrics');
                setLyrics(data);
            }
            fetchLyrics();
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        // Sidebar responsive
        const setResponsiveness = () => {setIsExpanded(window.innerWidth >= 900)};

        window.addEventListener("resize", setResponsiveness);
        return () => window.removeEventListener('resize', setResponsiveness);
    }, []);


    const handleLogout = async () => {
        if (user && user.id) {
            await logout(user.id);
        }
    };

    return (
        <Box container component="main" className={classes.root}>
            <Box>
                <Box>
                    <Header
                        user={user}
                        handleLogout={handleLogout}
                        activeAddLyric={activeAddLyric}
                        handleToggler={handleToggler}
                    />
                </Box>
                <Box className={classes.container}>
                    <SidebarContainer
                        lyrics={lyrics}
                        setActiveParole={setActiveParole}
                        className={classes.sidebar}
                        clearSearchedLyrics={clearSearchedLyrics}
                        addSearchedLyrics={addSearchedLyrics}
                        isExpanded={isExpanded}
                    />
                    <Box className={classes.content}>
                        {
                            isAddingLyric ?
                                <AddLyric
                                    postLyric={postLyric}
                                    user={user}
                                />
                                :
                                <ActiveLyric
                                    user={user}
                                    lyrics={lyrics}
                                    activeLyric={activeLyric}
                                    activeDiaporama={activeDiaporama}
                                    activeEditLyric={activeEditLyric}
                                    isEditingLyric={isEditingLyric}
                                    putLyric={putLyric}
                                />
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;