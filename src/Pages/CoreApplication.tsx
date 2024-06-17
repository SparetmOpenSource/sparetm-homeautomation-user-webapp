import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { displayToastify } from '../Utils/HelperFn';
import { useReactQuery_Get } from '../Api.tsx/useReactQuery_Get';
import { getProfile } from '../Api.tsx/ProfileConfigApis';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import CoreApplicationNav from '../Components/CoreApplication/CoreApplicationNav/CoreApplicationNav';
import { AnimatePresence } from 'framer-motion';
import ConfirmationBackdropModel from '../Components/Others/BackdropModel/ConfirmationBackdropModel/ConfirmationBackdropModel';
import {
    appLogOut,
    getProfileId,
    profileLogOutWithNavigation,
} from '../Utils/ProfileConfigHelperFn';
import { GET_PROFILE_IN_COREAPPLICATIONCLASS } from '../Data/QueryConstant';
import { useActive } from '../Hooks/UseActive';
import FrameBackdropModel from '../Components/Others/PicFrame/FrameBackdropModel';
import PicFrame from '../Components/Others/PicFrame/PicFrame';

const CoreApplication = () => {
    //const appUser = getAppAdminUser();
    //const infiniteVal = Number.MAX_SAFE_INTEGER
    const [openFrame, setOpenFrame] = useState(false);
    localStorage.setItem('screenSaverTimeout', '5000000');
    var timeOut = null;

    if (localStorage.getItem('screenSaverTimeout') !== null) {
        timeOut = localStorage.getItem('screenSaverTimeout');
    } else {
        timeOut = '9007199254740991';
    }

    const active = useActive(timeOut);

    const profileId = getProfileId();
    const navigate = useNavigate();
    const [firstRoomRoute, setFirstRoomRoute]: any = useState();

    /*************************************BACKDROP*************************************/

    const [logoutModelOpen, setLogoutModelOpen]: any = useState(false);
    const [accountModelOpen, setAccountModelOpen]: any = useState(false);
    const openLogout = () => {
        setLogoutModelOpen(true);
    };
    const closeLogout = () => {
        setLogoutModelOpen(false);
    };
    const openAccount = () => {
        setAccountModelOpen(true);
    };
    const closeAccount = () => {
        setAccountModelOpen(false);
    };
    const profileFn = () => {
        return getProfile(profileId);
    };
    const on_Success = (data: any) => {
        setFirstRoomRoute(data?.data?.body?.room[0]?.room_type);
    };

    const on_Error = (error: any) => {
        displayToastify(
            error?.response?.data?.message,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const { data: profileDetals } = useReactQuery_Get(
        GET_PROFILE_IN_COREAPPLICATIONCLASS,
        profileFn,
        on_Success,
        on_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        20000, // Cache time
        10000, // Stale Time
    );

    useEffect(() => {
        if (!active) {
            setOpenFrame(true);
        } else {
            setOpenFrame(false);
        }
    }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setOpenFrame(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /*{----------------------------------------------------------------------------------------------------------}*/

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                gap: '0.5rem',
            }}
        >
            {/* ***************************Navigation**************************** */}
            <section
                style={{
                    background: 'rgb(7, 22, 27)',
                    borderRadius: '0.5em',
                    padding: '0.5rem',
                    minWidth: '90px',
                    height: '100%',
                }}
            >
                <CoreApplicationNav
                    firstRoomRoute={firstRoomRoute}
                    logoutModelOpen={logoutModelOpen}
                    accountModelOpen={accountModelOpen}
                    openLogout={openLogout}
                    closeLogout={closeLogout}
                    openAccount={openAccount}
                    closeAccount={closeAccount}
                />
            </section>

            {/* **************************Content*************************** */}

            <section
                style={{
                    background: 'rgb(7, 22, 27)',
                    borderRadius: '0.5em',
                    padding: '0.5em',
                    width: '94vw',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.5em',
                    }}
                >
                    <Outlet context={profileDetals?.data?.body} />
                </div>
            </section>

            {/***********************************BACKDROP*********************************/}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {accountModelOpen && (
                    <ConfirmationBackdropModel
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        foregroundColor="rgb(21, 26, 30)"
                        handleClose={closeAccount}
                        text="You want to switch profile, Are you sure?"
                        btn_text="Yes"
                        setConfirmation={() =>
                            profileLogOutWithNavigation(navigate)
                        }
                    />
                )}
            </AnimatePresence>

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {logoutModelOpen && (
                    <ConfirmationBackdropModel
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        foregroundColor="rgb(21, 26, 30)"
                        handleClose={closeLogout}
                        text="Oh no! You are leaving. Are you sure?"
                        btn_text="Yes, Log me out"
                        setConfirmation={() => appLogOut(navigate)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {openFrame && (
                    <FrameBackdropModel backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)">
                        <PicFrame />
                    </FrameBackdropModel>
                )}
            </AnimatePresence>

            {/*************************************BACKDROP*************************************/}
        </div>
    );
};

export default CoreApplication;
