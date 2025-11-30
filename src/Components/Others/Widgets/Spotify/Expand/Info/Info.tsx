import { useMemo, useCallback } from 'react';
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
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { usePostUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { getMergedHeadersForSpotify } from '../../../../../../Api.tsx/Axios';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import LoadingFade from '../../../../LoadingAnimation/LoadingFade';
import {
    catchError,
    defaultOnSuccess,
    invalidateQueries,
    spotifyLogout,
} from '../../../../../../Utils/HelperFn';
import Button from '../../../../CustomButton/Button';
import { useBackDropOpen } from '../../../../../../Pages/ThemeProvider';
import Confirmation from '../../../../BackDrop/Confirmation/Confirmation';
import {
    LandscapeSizeS,
    SPOTIFY_ACTIVE_EXPAND,
    SPOTIFY_EXPAND_LOGOUT_CONFIRMATION,
} from '../../../../../../Data/Constants';
import { GiSoundWaves } from 'react-icons/gi';
import { VscRefresh } from 'react-icons/vsc';
import { useQueryClient } from 'react-query';
import useLocalStorage from '../../../../../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL } from '../../../../../../Data/Constants';

interface InfoProps {
    darkTheme: boolean;
    currentActiveDevice: string;
    handleRefresh: () => void;
}

const Info = ({ darkTheme, currentActiveDevice, handleRefresh }: InfoProps) => {
    const queryClient = useQueryClient();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');

    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    const profileStateFn = useCallback(() => getProfileState(accessToken), [accessToken]);
    const deviceStateFn = useCallback(() => getDeviceState(accessToken), [accessToken]);

    const on_error = useCallback(
        (error: any) => {
            catchError(error, darkTheme);
        },
        [darkTheme],
    );

    const { isLoading: profileIsLoading, data: profileData } =
        useReactQuery_Get(
            GET_SPOTIFY_PROFILE_STATE_QUERY_ID,
            profileStateFn,
            defaultOnSuccess,
            on_error,
            !!accessToken, // enable only when token is available
            true,
            false,
            false,
            false,
            0,
            0,
        );

    const { isLoading: deviceIsLoading, data: deviceState } = useReactQuery_Get(
        GET_SPOTIFY_DEVICE_STATE_QUERY_ID,
        deviceStateFn,
        defaultOnSuccess,
        on_error,
        !!accessToken, // enable only when token is available
        true,
        false,
        false,
        false,
        0,
        0,
    );

    const { mutate: transfer } = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=transferplayback`,
        { headers: getMergedHeadersForSpotify(accessToken) },
        defaultOnSuccess,
        on_error,
    );

    const refreshDevice = useCallback(() => {
        invalidateQueries(queryClient, [GET_SPOTIFY_DEVICE_STATE_QUERY_ID]);
    }, [queryClient]);

    const logoutSpotify = useCallback(() => {
        spotifyLogout();
        handleRefresh();
        toggleBackDropClose(SPOTIFY_EXPAND_LOGOUT_CONFIRMATION);
    }, [handleRefresh, toggleBackDropClose]);

    const renderProfile = () => (
        <section>
            <span style={{ color: color.success }}>
                <h1>Profile</h1>
            </span>
            <span>
                <img
                    className="spotify_profile_image"
                    src={profileData?.body?.images?.[0]?.url ?? ''}
                    height="100%"
                    width="100%"
                    loading="lazy"
                    alt="spotify_profile_image"
                />
            </span>
            <span>
                <h1 style={{ color: color.text }}>
                    {profileData?.body?.display_name}
                </h1>
                <p style={{ color: color.success }}>
                    country:{' '}
                    <span style={{ color: color.text }}>
                        {profileData?.body?.country}
                    </span>
                </p>
                <p style={{ color: color.success }}>
                    account status:{' '}
                    <span style={{ color: color.text }}>
                        {profileData?.body?.product}
                    </span>
                </p>
            </span>
        </section>
    );

    const renderDevices = () => (
        <section
            style={{
                border: `3px solid ${color.inner}`,
                borderRadius: '0.5rem',
            }}
        >
            <div>
                <section>
                    <h1 style={{ color: color.success }}>
                        active devices ({deviceState?.body?.devices?.length})
                    </h1>
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={refreshDevice}
                        className="spotify-info-wrapper-refresh"
                    >
                        <IconContext.Provider
                            value={{ size: '1.5em', color: color.text }}
                        >
                            <VscRefresh />
                        </IconContext.Provider>
                    </motion.span>
                </section>

                <Button
                    label="Logout"
                    textCol={color.text}
                    backCol={color.button}
                    width="80px"
                    fn={() => {
                        toggleBackDropOpen(
                            SPOTIFY_EXPAND_LOGOUT_CONFIRMATION,
                            <Confirmation
                                darkTheme={darkTheme}
                                heading="Oh no! You are leaving. Are you sure?"
                                btnOkFn={() => {
                                    logoutSpotify();
                                    toggleBackDropClose(SPOTIFY_ACTIVE_EXPAND);
                                    toggleBackDropClose(
                                        SPOTIFY_EXPAND_LOGOUT_CONFIRMATION,
                                    );
                                }}
                                btnCancelFn={() =>
                                    toggleBackDropClose(
                                        SPOTIFY_EXPAND_LOGOUT_CONFIRMATION,
                                    )
                                }
                                btnOkLabel="Yes, Log me out"
                                btnCancelLabel="Cancel"
                            />,
                            LandscapeSizeS,
                        );
                    }}
                    status={false}
                    border={color.element}
                />
            </div>

            {deviceState?.body?.devices?.map((item: any) => {
                const isActive = currentActiveDevice === item?.id;
                const bgOpacity = isActive ? '0.6' : '0.2';
                const backgroundColor = `${color.button.split(')')[0]}${
                    color.button.split(')')[1]
                },${bgOpacity})`;

                return (
                    <motion.span
                        key={item?.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.99 }}
                        className="spotify-info-wrapper-device-list"
                        onClick={() =>
                            transfer({ device_ids: [item?.id], play: true })
                        }
                        style={{ backgroundColor }}
                    >
                        <p style={{ color: color.text }}>
                            {item?.name} ({item?.type})
                        </p>
                        {isActive && (
                            <IconContext.Provider
                                value={{ size: '1.5em', color: color.text }}
                            >
                                <GiSoundWaves />
                            </IconContext.Provider>
                        )}
                    </motion.span>
                );
            })}
        </section>
    );

    return (
        <div className="spotify-info">
            {profileIsLoading || deviceIsLoading ? (
                <div className="spotify-info-isLoading">
                    <LoadingFade />
                </div>
            ) : (
                <div className="spotify-info-wrapper">
                    {renderProfile()}
                    {renderDevices()}
                </div>
            )}
        </div>
    );
};

export default Info;
