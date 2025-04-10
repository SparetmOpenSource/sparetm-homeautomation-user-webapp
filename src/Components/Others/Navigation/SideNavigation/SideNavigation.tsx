import './SideNavigation.css';
import { IconContext } from 'react-icons';
import { AiOutlineLogout } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../../Pages/ThemeProvider';
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
import Confirmation from '../../BackDrop/Confirmation/Confirmation';
import { useQueryClient } from 'react-query';

const SideNavigation = (props: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    const sidenav_upper_list = props?.upper_list ? props?.upper_list : [];
    const sidenav_lower_list = props?.lower_list ? props?.lower_list : [];

    return (
        <section className="side_navigation">
            <div>
                {sidenav_upper_list?.length !== 0 &&
                    sidenav_upper_list?.map((item: any) => (
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
                {props?.profileLogOut && (
                    <motion.span
                        style={{ backgroundColor: color?.outer }}
                        initial={{ scale: 1 }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        // onClick={() => {
                        //     props?.toggleBackDropOpen();
                        //     props?.setChildForCustomBackDrop(
                        //         <Confirmation
                        //             darkTheme={darkTheme}
                        //             heading={props?.profileBtnHeading}
                        //             btnOkFn={() => {
                        //                 props?.toggleBackDropClose();
                        //                 logoutProfileOnClick(
                        //                     dispatch,
                        //                     queryClient,
                        //                     navigate,
                        //                 );
                        //             }}
                        //             btnCancelFn={() =>
                        //                 props?.toggleBackDropClose()
                        //             }
                        //             btnOkLabel={props?.profileBtnOkLabel}
                        //             btnCancelLabel="Cancel"
                        //         />,
                        //     );
                        //     props?.setSizeForCustomBackDrop(LandscapeSizeS);
                        // }}
                        onClick={() => {
                            const backdropId =
                                SIDE_NAV_CONFIRMATION_FOR_PROFILE_CHANGE;

                            props?.toggleBackDropOpen(
                                backdropId,
                                <Confirmation
                                    darkTheme={darkTheme}
                                    heading={props?.profileBtnHeading}
                                    btnOkFn={() => {
                                        props?.toggleBackDropClose(backdropId);
                                        logoutProfileOnClick(
                                            dispatch,
                                            queryClient,
                                            navigate,
                                        );
                                    }}
                                    btnCancelFn={() =>
                                        props?.toggleBackDropClose(backdropId)
                                    }
                                    btnOkLabel={props?.profileBtnOkLabel}
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
                {sidenav_lower_list?.length !== 0 &&
                    sidenav_lower_list?.map((item: any) => (
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
                    // onClick={() => {
                    //     props?.toggleBackDropOpen();
                    //     props?.setChildForCustomBackDrop(
                    //         <Confirmation
                    //             darkTheme={darkTheme}
                    //             heading={props?.logoutBtnHeading}
                    //             btnOkFn={() => {
                    //                 props?.toggleBackDropClose();
                    //                 dispatch(resetApp());
                    //                 queryClient.clear();
                    //                 navigate(RoutePath.Home);
                    //             }}
                    //             btnCancelFn={() => props?.toggleBackDropClose()}
                    //             btnOkLabel={props?.logoutBtnOkLabel}
                    //             btnCancelLabel="Cancel"
                    //         />,
                    //     );
                    //     props?.setSizeForCustomBackDrop(LandscapeSizeS);
                    // }}
                    onClick={() => {
                        const backdropId =
                            SIDE_NAV_CONFIRMATION_FOR_LOGOUT_PROFILE; // Unique ID for this backdrop

                        props?.toggleBackDropOpen(
                            backdropId,
                            <Confirmation
                                darkTheme={darkTheme}
                                heading={props?.logoutBtnHeading}
                                btnOkFn={() => {
                                    props?.toggleBackDropClose(backdropId);
                                    dispatch(resetApp());
                                    queryClient.clear();
                                    navigate(RoutePath.Home);
                                }}
                                btnCancelFn={() =>
                                    props?.toggleBackDropClose(backdropId)
                                }
                                btnOkLabel={props?.logoutBtnOkLabel}
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
