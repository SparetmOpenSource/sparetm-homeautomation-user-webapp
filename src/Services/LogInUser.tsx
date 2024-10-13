import axios from 'axios';
import { RoutePath } from '../Data/Constants';
import { displayToastify } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { authUrl } from '../Api.tsx/SignUpApis';
import { addAdmin, addToken } from '../Features/User/UserSlice';

const login = (
    response: any,
    darkTheme: boolean,
    dispatch: any,
    navigate: any,
) => {
    const token = response?.data?.body?.access_token;
    const admin = response?.data?.body?.admin_name;
    displayToastify(
        `Signing In as ${admin.split('@')[0]}`,
        !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
        TOASTIFYSTATE.SUCCESS,
    );
    dispatch(addToken(token));
    dispatch(addAdmin(admin));
    navigate(RoutePath.ProfileConfig);
};

export const LoginUser = async (
    data: any,
    darkTheme: boolean,
    dispatch: any,
    navigate: any,
) => {
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    try {
        let response = await axios.post(authUrl.app_login, data, options);
        login(response, darkTheme, dispatch, navigate);
    } catch (error) {
        displayToastify(
            'The user name or password are incorrect',
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    }
};
