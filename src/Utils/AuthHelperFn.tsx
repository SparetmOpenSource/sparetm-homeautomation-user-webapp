import { RoutePath } from "../Data/Constant";

// Get JWT Token
export const setAccessToken = (response: any) => {
    const accessToken = response?.data?.token;
    localStorage.setItem('token', accessToken);
};
export const getAccessToken = () => {
    const accessToken = localStorage.getItem('token');
    return accessToken;
};
export const removeAccessToken = () => {
    localStorage.removeItem('token');
};

// Admin user
export const getAppAdminUser = () => {
    const adminUserName = localStorage.getItem('appUser');
    return adminUserName;
};

export const setAppAdminUser = (response: any) => {
    const adminUserName = response?.data?.userName;
    localStorage.setItem('appUser', adminUserName);
};

export const removeAppAdminUser = () => {
    localStorage.removeItem('appUser');
};

// Profile id
export const setProfileId = (profileId: any) => {
    localStorage.setItem('profileId', profileId);
};

export const getProfileId = () => {
    const profileName = localStorage.getItem('profileId');
    return profileName;
};

export const removeProfileId = () => {
    localStorage.removeItem('profileId');
};

// Logout
export const logOut = (navigate: any) => {
    removeAccessToken();
    removeAppAdminUser();
    removeProfileId();
    navigate(RoutePath.Home);
};

// Open profile
export const openProfileOnClick = (profileId: any, navigate: any) => {
    removeProfileId();
    setProfileId(profileId);
    navigate(RoutePath.CoreApplication);
};


