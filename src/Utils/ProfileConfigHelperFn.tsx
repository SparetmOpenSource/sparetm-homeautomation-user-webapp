import { RoutePath } from '../Data/Constants';
import {
    addProfile,
    addProfileId,
    resetProfile,
} from '../Features/User/UserSlice';
import {
    clearLocalStorageOnProfileSwitch,
} from './HelperFn';

export const openProfileOnClick = (
    profileName: any,
    profileId: any,
    dispatch: any,
    queryClient: any,
    navigate: any,
) => {
    clearLocalStorageOnProfileSwitch();
    dispatch(resetProfile());
    dispatch(addProfile(profileName));
    dispatch(addProfileId(profileId));
    queryClient.clear();
    navigate(
        RoutePath.CoreApplication +
            '/' +
            RoutePath.Dashboard +
            '/' +
            RoutePath.Dashboard_Device_Status,
    );
};

export const logoutProfileOnClick = (
    dispatch: any,
    queryClient: any,
    navigate: any,
) => {
    clearLocalStorageOnProfileSwitch();
    dispatch(resetProfile());
    queryClient.clear();
    navigate(RoutePath.SelectProfileConfig);
};
