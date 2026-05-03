import { RoutePath } from '../../../data/constants';
import {
    clearLocalStorageOnProfileSwitch,
} from '../../../utils/helperfn';
import {
    addProfile,
    addProfileId,
    resetProfile,
} from '../store/user/userslice';

export const openProfileOnClick = (
    profileName: string,
    profileId: string,
    dispatch: (action: any) => any,
    queryClient: any,
    navigate: (path: string, options?: any) => void,
) => {
    clearLocalStorageOnProfileSwitch();
    dispatch(resetProfile());
    dispatch(addProfile(profileName));
    dispatch(addProfileId(profileId));
    queryClient.clear();
    navigate(
        `${RoutePath.CoreApplication_Dashboard}${RoutePath.Device_Status}`,
    );
};

export const logoutProfileOnClick = (
    dispatch: (action: any) => any,
    queryClient: any,
    navigate: (path: string, options?: any) => void,
) => {
    clearLocalStorageOnProfileSwitch();
    dispatch(resetProfile());
    queryClient.clear();
    navigate(RoutePath.SelectProfileConfig);
};
