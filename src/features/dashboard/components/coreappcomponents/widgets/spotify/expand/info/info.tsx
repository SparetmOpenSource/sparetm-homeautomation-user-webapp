import { motion } from 'framer-motion';
import { useCallback, useMemo } from 'react';
import { IconContext } from 'react-icons';
import { GiSoundWaves } from 'react-icons/gi';
import { VscRefresh } from 'react-icons/vsc';
import { useQueryClient } from 'react-query';
import {
    useSpotifyDeviceState,
    useSpotifyProfileState,
    useSpotifyTransferPlayback,
} from '../../../../../../../../core/api/spotify/api';
import { useBackDropOpen } from '../../../../../../../../core/router/themeprovider';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../../data/colorconstant';
import {
    LandscapeSizeS,
    SPOTIFY_ACTIVE_EXPAND,
    SPOTIFY_EXPAND_LOGOUT_CONFIRMATION,
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_PREMIUM_ACCOUNT_TYPE,
    SPOTIFY_TOKEN_GLOBAL,
} from '../../../../../../../../data/constants';
import {
    GET_SPOTIFY_DEVICE_STATE_QUERY_ID,
} from '../../../../../../../../data/queryconstant';
import { useProfileLocalStorage } from '../../../../../../../../features/auth/utils/authhelpers';
import Confirmation from '../../../../../../../../shared/commoncomponents/backdrop/confirmation/confirmation';
import Button from '../../../../../../../../shared/commoncomponents/custombutton/button';
import LoadingFade from '../../../../../../../../shared/commoncomponents/loadinganimation/loadingfade';
import {
    defaultOnSuccess,
    invalidateQueries,
    spotifyLogout,
} from '../../../../../../../../utils/helperfn';
import './info.css';

interface InfoProps {
    darkTheme: boolean;
    currentActiveDevice: string;
    handleRefresh: () => void;
}

const Info = ({ darkTheme, currentActiveDevice, handleRefresh }: InfoProps) => {
    const queryClient = useQueryClient();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const [accessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [spotifyAcntType] = useProfileLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const isPremium = spotifyAcntType?.trim().toLowerCase() === SPOTIFY_PREMIUM_ACCOUNT_TYPE;

    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    const { isLoading: profileIsLoading, data: profileData } = useSpotifyProfileState(accessToken, darkTheme);
    const { isLoading: deviceIsLoading, data: deviceState } = useSpotifyDeviceState(accessToken, darkTheme);


    const { mutate: transfer } = useSpotifyTransferPlayback(accessToken, darkTheme, defaultOnSuccess);

    const refreshDevice = useCallback(() => {
        invalidateQueries(queryClient, [GET_SPOTIFY_DEVICE_STATE_QUERY_ID]);
    }, [queryClient]);

    const logoutSpotify = useCallback(() => {
        spotifyLogout();
        handleRefresh();
        toggleBackDropClose(SPOTIFY_EXPAND_LOGOUT_CONFIRMATION);
    }, [handleRefresh, toggleBackDropClose]);

    const renderProfile = () => (
        <section className="spotify-info-profile">
            <h1 className="spotify-info-profile-header" style={{ color: color.success }}>Profile</h1>
            <div className="spotify-info-profile-img-container">
                <img
                    className="spotify-info-profile-image"
                    src={profileData?.data?.body?.images?.[0]?.url ?? ''}
                    height="100%"
                    width="100%"
                    loading="lazy"
                    alt="spotify_profile"
                />
            </div>
            <div className="spotify-info-profile-details">
                <h2 style={{ color: color.text }}>
                    {profileData?.data?.body?.display_name}
                </h2>
                <p style={{ color: color.success }}>
                    country:{' '}
                    <span style={{ color: color.text }}>
                        {profileData?.data?.body?.country}
                    </span>
                </p>
                <p style={{ color: color.success }}>
                    account status:{' '}
                    <span style={{ color: color.text }}>
                        {profileData?.data?.body?.product}
                    </span>
                </p>
            </div>
        </section>
    );

    const renderDevices = () => (
        <section
            className="spotify-info-devices"
            style={{
                border: `2px solid ${color.element}`,
                backgroundColor: color.inner,
                borderRadius: '1rem',
            }}
        >
            <div className="spotify-info-devices-header">
                <div className="spotify-info-devices-title-group">
                    <h1 className="spotify-info-devices-title" style={{ color: color.success }}>
                        active devices ({deviceState?.data?.body?.devices?.length || 0})
                    </h1>
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={refreshDevice}
                        className="spotify-info-wrapper-refresh"
                    >
                        <IconContext.Provider value={{ size: '1.2em', color: color.text }}>
                            <VscRefresh />
                        </IconContext.Provider>
                    </motion.span>
                </div>

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
                                    toggleBackDropClose(SPOTIFY_EXPAND_LOGOUT_CONFIRMATION);
                                }}
                                btnCancelFn={() => toggleBackDropClose(SPOTIFY_EXPAND_LOGOUT_CONFIRMATION)}
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

            {deviceState?.data?.body?.devices?.map((item: any) => {
                const isActive = currentActiveDevice === item?.id;
                const bgOpacity = isActive ? '0.6' : '0.1';
                const backgroundColor = `${color.button.split(')')[0]}${color.button.split(')')[1]},${bgOpacity})`;

                return (
                    <motion.span
                        key={item?.id}
                        whileHover={isPremium ? { scale: 1.02 } : {}}
                        whileTap={isPremium ? { scale: 0.98 } : {}}
                        className="spotify-info-wrapper-device-list"
                        onClick={() => isPremium && transfer({ device_ids: [item?.id], play: true })}
                        style={{ 
                            backgroundColor,
                            cursor: isPremium ? 'pointer' : 'default',
                            opacity: isPremium || isActive ? 1 : 0.5
                        }}
                    >
                        <p style={{ color: color.text }}>
                            {item?.name} ({item?.type})
                        </p>
                        {isActive && (
                            <IconContext.Provider value={{ size: '1.2em', color: color.text }}>
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
