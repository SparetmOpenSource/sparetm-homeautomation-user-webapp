import { APPPROFILE, TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import {
    APPPROFILEKEY,
    APPTOKENKEY,
    APPUSERKEY,
    OFFLINETESTPASSWORDKEY,
    OFFLINETESTUSERNAMEKEY,
    PROFILEIDKEY,
    PROFILENAMEKEY,
    RoutePath,
} from '../Data/Constants';
import { displayToastify } from './HelperFn';

export const profileLogOutWithNavigation = (navigate: any) => {
    removeProfileId();
    removeProfileName();
    navigate(RoutePath.SelectProfileConfig);
};

export const profileLogOutWithoutNavigation = () => {
    removeProfileId();
    removeProfileName();
};

// Admin user
export const getAppAdminUser = () => {
    const adminUserName = localStorage.getItem(APPUSERKEY);
    return adminUserName;
};

export const setAppAdminUser = (response: any) => {
    const adminUserName = response?.data?.body?.admin_name;
    localStorage.setItem(APPUSERKEY, adminUserName);
};

export const removeAppAdminUser = () => {
    localStorage.removeItem(APPUSERKEY);
};

// Profile id
export const setProfileId = (profileId: any) => {
    localStorage.setItem(PROFILEIDKEY, profileId);
};

export const getProfileId = () => {
    const profileName = localStorage.getItem(PROFILEIDKEY);
    return profileName;
};

export const removeProfileId = () => {
    localStorage.removeItem(PROFILEIDKEY);
};

// Profile name
export const setProfileName = (profileName: any) => {
    localStorage.setItem(PROFILENAMEKEY, profileName);
};

export const getProfileName = () => {
    const profileName = localStorage.getItem(PROFILENAMEKEY);
    return profileName;
};

export const removeProfileName = () => {
    localStorage.removeItem(PROFILENAMEKEY);
};

// ----------------------- Set,Get,Remove JWT Token -------------------------//

export const setAccessToken = (response: any) => {
    const accessToken = response?.data?.body?.access_token;
    localStorage.setItem(APPTOKENKEY, accessToken);
};
export const getAccessToken = () => {
    const accessToken = localStorage.getItem(APPTOKENKEY);
    return accessToken;
};
export const removeAccessToken = () => {
    localStorage.removeItem(APPTOKENKEY);
};

// ---------------------- setOfflineUser ------------------------- //

export const setAppProfile = (status: boolean) => {
    if (status === true) {
        localStorage.setItem(APPPROFILEKEY, APPPROFILE.STATUSOFF);
    } else {
        localStorage.setItem(APPPROFILEKEY, APPPROFILE.STATUSON);
    }
    let currentProfile = localStorage.getItem(APPPROFILEKEY);
    if (localStorage.getItem(APPPROFILEKEY) === APPPROFILE.STATUSOFF) {
        displayToastify(
            `${currentProfile?.charAt(0).toUpperCase()}${currentProfile?.slice(
                1,
            )} mode ON`,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.INFO,
        );
    }
};

export const setOfflineUser = (userName: any, password: any) => {
    localStorage.setItem(OFFLINETESTUSERNAMEKEY, userName);
    localStorage.setItem(OFFLINETESTPASSWORDKEY, password);
};

export const getOfflineUser = () => {
    const offlineTestUserName = localStorage.getItem(OFFLINETESTUSERNAMEKEY);
    const offlineTestPassword = localStorage.getItem(OFFLINETESTPASSWORDKEY);
    const offlineCred = {
        userName: offlineTestUserName,
        password: offlineTestPassword,
    };
    return offlineCred;
};

const removeOfflineUser = () => {
    localStorage.removeItem(OFFLINETESTUSERNAMEKEY);
    localStorage.removeItem(OFFLINETESTPASSWORDKEY);
};

export const openProfileOnClick = (
    profileName: any,
    profileId: any,
    navigate: any,
) => {
    // if (displayToastify('Signing In', TOASTIFYCOLOR.DARK, TOASTIFYSTATE.INFO)) {
    //   displayToastify(`Signing In as ${profileName}`, TOASTIFYCOLOR.DARK, TOASTIFYSTATE.INFO)
    // } else {
    removeProfileId();
    removeProfileName();
    // const queryClient = useQueryClient();
    // queryClient.invalidateQueries();
    setProfileId(profileId);
    setProfileName(profileName);
    navigate(
        // RoutePath.CoreApplication + '/dashboard/' + RoutePath.Dashboard_Todo,
        RoutePath.CoreApplication +
            '/' +
            RoutePath.Dashboard +
            '/' +
            RoutePath.Dashboard_Device_Status,
    );
    // navigate(RoutePath.Dashboard_Todo);
    //removeCityCountryStateToken();
    // }
};

// Logout
export const appLogOut = (navigate: any) => {
    if (localStorage.getItem(APPPROFILEKEY) === APPPROFILE.STATUSOFF) {
        removeOfflineUser();
    }
    removeAccessToken();
    removeAppAdminUser();
    removeProfileId();
    removeAccessToken();
    removeAppAdminUser();
    //removeCityCountryStateToken();
    removeProfileName();
    navigate(RoutePath.Home);
};
