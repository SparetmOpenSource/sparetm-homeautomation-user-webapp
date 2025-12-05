import './SideNavigation.css';
import { IconContext } from 'react-icons';
import { AiOutlineLogout } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useEffect, useState } from 'react';
import { useBackDropOpen, useTheme } from '../../../../Pages/ThemeProvider';
import { useAppDispatch } from '../../../../Features/ReduxHooks';
import {
    LandscapeSizeS,
    RoutePath,
    SIDE_NAV_CONFIRMATION_FOR_LOGOUT_PROFILE,
    SIDE_NAV_CONFIRMATION_FOR_PROFILE_CHANGE,
} from '../../../../Data/Constants';
import { resetApp } from '../../../../Features/User/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { logoutProfileOnClick } from '../../../../Utils/ProfileConfigHelperFn';
import { clearLocalStorageOnLogout } from '../../../../Utils/HelperFn';
import Confirmation from '../../BackDrop/Confirmation/Confirmation';
import { useQueryClient } from 'react-query';

const SideNavigation = ({
    upper_nav_option,
    lower_nav_option,
    profile_logout_enable,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const darkTheme: any = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="side-navigation">
            <div>
                {upper_nav_option &&
                    upper_nav_option?.length !== 0 &&
                    upper_nav_option?.map((item: any) => (
                        <Link to={item?.to} key={item?.id}>
                            <motion.span
                                style={{
                                    borderLeft:
                                        item?.currentPath === item?.listPath ||
                                        item?.currentPath?.includes(
                                            item?.listPath,
                                        )
                                            ? `3px solid ${color?.button}`
                                            : '',
                                    backgroundColor:
                                        item?.currentPath === item?.listPath ||
                                        item?.currentPath?.includes(
                                            item?.listPath,
                                        )
                                            ? color?.hover
                                            : color?.outer,
                                }}
                                initial={{ scale: 1 }}
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.2em',
                                        color:
                                            item?.currentPath ===
                                                item?.listPath ||
                                            item?.currentPath?.includes(
                                                item?.listPath,
                                            )
                                                ? color?.button
                                                : color?.icon,
                                    }}
                                >
                                    {item?.icon}
                                    {item?.currentPath === item?.listPath ||
                                    item?.currentPath?.includes(
                                        item?.listPath,
                                    ) ? (
                                        ''
                                    ) : (
                                        <p style={{ color: color?.icon_font }}>
                                            {item?.label}
                                        </p>
                                    )}
                                </IconContext.Provider>
                            </motion.span>
                        </Link>
                    ))}
                {profile_logout_enable && (
                    <motion.span
                        style={{ backgroundColor: color?.outer }}
                        initial={{ scale: 1 }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        onClick={() => {
                            const backdropId =
                                SIDE_NAV_CONFIRMATION_FOR_PROFILE_CHANGE;

                            toggleBackDropOpen(
                                backdropId,
                                <Confirmation
                                    darkTheme={darkTheme}
                                    heading="You want to switch profile, Are you sure?"
                                    btnOkFn={() => {
                                        toggleBackDropClose(backdropId);
                                        logoutProfileOnClick(
                                            dispatch,
                                            queryClient,
                                            navigate,
                                        );
                                    }}
                                    btnCancelFn={() =>
                                        toggleBackDropClose(backdropId)
                                    }
                                    btnOkLabel="Yes"
                                    btnCancelLabel="Cancel"
                                />,
                                LandscapeSizeS,
                            );
                        }}
                    >
                        <IconContext.Provider
                            value={{
                                size: '1.2em',
                                color: color?.text,
                            }}
                        >
                            <CgProfile />
                            <p style={{ color: color?.text }}>Switch</p>
                        </IconContext.Provider>
                    </motion.span>
                )}
            </div>
            <div>
                {lower_nav_option &&
                    lower_nav_option?.length !== 0 &&
                    lower_nav_option?.map((item: any) => (
                        <Link to={item?.to} key={item?.id}>
                            <motion.span
                                style={{
                                    borderLeft:
                                        item?.currentPath === item?.listPath ||
                                        item?.currentPath?.includes(
                                            item?.listPath,
                                        )
                                            ? `3px solid ${color?.button}`
                                            : '',
                                    backgroundColor:
                                        item?.currentPath === item?.listPath ||
                                        item?.currentPath?.includes(
                                            item?.listPath,
                                        )
                                            ? color?.hover
                                            : color?.outer,
                                }}
                                initial={{ scale: 1 }}
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.2em',
                                        color:
                                            item?.currentPath ===
                                                item?.listPath ||
                                            item?.currentPath?.includes(
                                                item?.listPath,
                                            )
                                                ? color?.button
                                                : color?.icon,
                                    }}
                                >
                                    {item?.icon}
                                    {item?.currentPath === item?.listPath ||
                                    item?.currentPath?.includes(
                                        item?.listPath,
                                    ) ? (
                                        ''
                                    ) : (
                                        <p style={{ color: color?.icon_font }}>
                                            {item?.label}
                                        </p>
                                    )}
                                </IconContext.Provider>
                            </motion.span>
                        </Link>
                    ))}
                <motion.span
                    style={{ backgroundColor: color?.outer }}
                    initial={{ scale: 1 }}
                    whileHover={{
                        scale: 1.1,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    onClick={() => {
                        const backdropId =
                            SIDE_NAV_CONFIRMATION_FOR_LOGOUT_PROFILE;

                        toggleBackDropOpen(
                            backdropId,
                            <Confirmation
                                darkTheme={darkTheme}
                                heading="Oh no! You are leaving. Are you sure?"
                                btnOkFn={() => {
                                    toggleBackDropClose(backdropId);
                                    clearLocalStorageOnLogout();
                                    dispatch(resetApp());
                                    queryClient.clear();
                                    navigate(RoutePath.Home);
                                }}
                                btnCancelFn={() =>
                                    toggleBackDropClose(backdropId)
                                }
                                btnOkLabel="Yes, Log me out"
                                btnCancelLabel="Cancel"
                            />,
                            LandscapeSizeS,
                        );
                    }}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.2em',
                            color: color?.text,
                        }}
                    >
                        <AiOutlineLogout />
                        <p style={{ color: color?.text }}>Logout</p>
                    </IconContext.Provider>
                </motion.span>
            </div>
        </section>
    );
};

export default SideNavigation;
