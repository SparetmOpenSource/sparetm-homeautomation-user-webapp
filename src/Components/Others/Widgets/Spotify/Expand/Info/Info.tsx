import { useEffect, useState } from 'react';
import './Info.css';
import {
    GET_SPOTIFY_DEVICE_STATE_QUERY_ID,
    GET_SPOTIFY_PROFILE_STATE_QUERY_ID,
} from '../../../../../../Data/QueryConstant';
import {
    getDeviceState,
    getProfileState,
} from '../../../../../../Api.tsx/Spotify/Api';
import {
    dark_colors,
    light_colors,
} from '../../../../../../Data/ColorConstant';
import { useReactQuery_Get } from '../../../../../../Api.tsx/useReactQuery_Get';
import { GiLoveSong } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { usePostUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { getMergedHeaders } from '../../../../../../Api.tsx/Axios';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import LoadingFade from '../../../../LoadingAnimation/LoadingFade';
import {
    defaultOnError,
    defaultOnSuccess,
    spotifyLogout,
} from '../../../../../../Utils/HelperFn';
import Button from '../../../../CustomButton/Button';
import { useBackDropOpen } from '../../../../../../Pages/ThemeProvider';
import Confirmation from '../../../../BackDrop/Confirmation/Confirmation';
import { LandscapeSizeS } from '../../../../../../Data/Constants';
import { GiSoundWaves } from 'react-icons/gi';

const Info = ({
    darkTheme,
    currentActiveDevice,
    handleRefresh,
}: // toggleBackDropClose,
any) => {
    const [color, setColor] = useState<any>(light_colors);

    const profileStateFn = () => {
        const token = localStorage.getItem('spotify_access_token');
        return getProfileState(darkTheme, token);
    };

    const deviceStateFn = () => {
        const token = localStorage.getItem('spotify_access_token');
        return getDeviceState(darkTheme, token);
    };

    const {
        toggleBackDropOpen,
        toggleBackDropClose,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

    const logoutSpotify = () => {
        spotifyLogout();
        handleRefresh();
        toggleBackDropClose();
    };

    const {
        isLoading: profileIsLoading,
        isError: profileIsError,
        data,
    } = useReactQuery_Get(
        GET_SPOTIFY_PROFILE_STATE_QUERY_ID,
        profileStateFn,
        defaultOnSuccess,
        defaultOnError,
        true, //playBackStatus, //true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        0, // Cache time
        0, // Stale Time
    );

    const {
        isLoading: deviceIsLoading,
        isError: deviceIsError,
        data: deviceState,
    } = useReactQuery_Get(
        GET_SPOTIFY_DEVICE_STATE_QUERY_ID,
        deviceStateFn,
        defaultOnSuccess,
        defaultOnError,
        true, //playBackStatus, //true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        0, // Cache time
        0, // Stale Time
    );

    const updateHeaderConfig = {
        headers: getMergedHeaders(localStorage.getItem('spotify_access_token')),
    };

    const { mutate: transfer } = usePostUpdateData(
        featureUrl.spotify_base_url + `?data=transferplayback`,
        updateHeaderConfig,
        defaultOnSuccess,
        defaultOnError,
    );

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="spotify-info">
            {(profileIsLoading || deviceIsLoading) && (
                <div className="spotify-info-isLoading">
                    <LoadingFade />
                </div>
            )}
            {!profileIsLoading && !deviceIsLoading && (
                <div className="spotify-info-wrapper">
                    <section>
                        <span style={{ color: color?.success }}>
                            <h1>Profile</h1>
                        </span>
                        <span>
                            <img
                                className="spotify_profile_image"
                                src={data?.images[0]?.url}
                                height="100%"
                                width="100%"
                                loading="lazy"
                                alt="spotify_profile_image"
                            />
                        </span>
                        <span>
                            <h1 style={{ color: color?.text }}>
                                {data?.display_name}
                            </h1>
                            <p style={{ color: color?.success }}>
                                country:{' '}
                                <span style={{ color: color?.text }}>
                                    {data?.country}
                                </span>
                            </p>
                            <p style={{ color: color?.success }}>
                                account status:{' '}
                                <span style={{ color: color?.text }}>
                                    {data?.product}
                                </span>
                            </p>
                        </span>
                    </section>
                    <section
                        style={{
                            border: `3px solid ${color?.inner}`,
                            borderRadius: '0.5rem',
                        }}
                    >
                        <div>
                            <h1 style={{ color: color?.success }}>
                                active devices (
                                {deviceState?.body?.devices?.length})
                            </h1>
                            <Button
                                label="Logout"
                                textCol={color?.text}
                                backCol={color?.button}
                                width="80px"
                                fn={() => {
                                    toggleBackDropOpen();
                                    setChildForCustomBackDrop(
                                        <Confirmation
                                            darkTheme={darkTheme}
                                            heading="Oh no! You are leaving. Are you sure?"
                                            btnOkFn={() => {
                                                logoutSpotify();
                                            }}
                                            btnCancelFn={() =>
                                                toggleBackDropClose()
                                            }
                                            btnOkLabel="Yes, Log me out"
                                            btnCancelLabel="Cancel"
                                        />,
                                    );
                                    setSizeForCustomBackDrop(LandscapeSizeS);
                                }}
                                status={false}
                                border={color?.element}
                            />
                        </div>

                        {deviceState?.body?.devices.map((item: any) => (
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() =>
                                    transfer({
                                        device_ids: [`${item?.id}`],
                                        play: true,
                                    })
                                }
                                style={{
                                    backgroundColor:
                                        currentActiveDevice !== item?.id
                                            ? `${color?.button.split(')')[0]}
                    ${color?.button.split(')')[1]},0.2)`
                                            : `${color?.button.split(')')[0]}
                    ${color?.button.split(')')[1]},0.6)`,
                                }}
                                key={item?.id}
                            >
                                <p style={{ color: color?.text }}>
                                    {item?.name} ({item?.type})
                                </p>
                                {currentActiveDevice === item?.id && (
                                    <IconContext.Provider
                                        value={{
                                            size: '1.5em',
                                            color: color?.text,
                                        }}
                                    >
                                        <GiSoundWaves />
                                    </IconContext.Provider>
                                )}
                            </motion.span>
                        ))}
                    </section>
                </div>
            )}
        </div>
    );
};

export default Info;
