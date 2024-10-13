import './Spotify.css';
import { IconContext } from 'react-icons';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { FaSpotify } from 'react-icons/fa';
import { IoPauseCircleOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useBackDropOpen, useTheme } from '../../../../Pages/ThemeProvider';
import { motion } from 'framer-motion';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { HorizontalSize } from '../../../../Data/Constants';
import Expand from './Expand';
// import {
//     fetchProfile,
//     getAccessToken,
//     populateUI,
//     redirectToAuthCodeFlow,
// } from '../../../../Api.tsx/Spotify/Script';

const Spotify = () => {
    const [play, setPlay] = useState<any>(false);
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    const pausePlay = () => {
        setPlay((prev: boolean) => !prev);
    };

    const {
        toggleBackDropOpen,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

    // useEffect(() => {
    //     if (play) {
    //         alert('Song playing');
    //     } else if (!play) {
    //         alert('Song paused');
    //     }
    // }, [play]); // eslint-disable-line react-hooks/exhaustive-deps

    // const clientId = 'ad37eacb72aa4f8891ccda3c0782b86a'; // Replace with your client id
    // const redirectUri = 'http://localhost:3000/callback';
    // const code = undefined;
    // const params = new URLSearchParams(window.location.search);
    // const code = params.get('code');

    // if (!code) {
    //     redirectToAuthCodeFlow(clientId);
    // } else {
    //     const accessToken: any = getAccessToken(clientId, code, redirectUri);
    //     const profile: any = fetchProfile(accessToken);
    //     populateUI(profile);
    // }

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            className="spotify"
            style={{ backgroundColor: color?.element }}
        >
            <span style={{ backgroundColor: color?.outer }}>
                <IconContext.Provider
                    value={{
                        size: '7em',
                        color: color?.text,
                    }}
                >
                    <RiNeteaseCloudMusicLine />
                </IconContext.Provider>
            </span>
            <span>
                <div>
                    <section>
                        <h1 style={{ color: color?.text }}>Pony</h1>
                        <p style={{ color: color?.icon_font }}>Ginuwine</p>
                    </section>
                    <section>
                        <h1
                            style={{
                                marginTop: '1.5rem',
                                fontSize: '1rem',
                                color: color?.text,
                            }}
                        >
                            Next
                        </h1>
                        <h1 style={{ color: color?.text }}>God's Plan</h1>
                        <p style={{ color: color?.icon_font }}>Drake</p>
                    </section>
                </div>
                <div>
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            toggleBackDropOpen();
                            setChildForCustomBackDrop(
                                <Expand
                                    darkTheme={darkTheme}
                                />,
                            );
                            setSizeForCustomBackDrop(HorizontalSize);
                        }}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: color?.success,
                            }}
                        >
                            <FaSpotify />
                        </IconContext.Provider>
                    </motion.span>
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => pausePlay()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: color?.text,
                            }}
                        >
                            {play ? (
                                <IoPauseCircleOutline />
                            ) : (
                                <IoPlayCircleOutline />
                            )}
                        </IconContext.Provider>
                    </motion.span>
                </div>
            </span>
        </motion.div>
    );
};

export default Spotify;
