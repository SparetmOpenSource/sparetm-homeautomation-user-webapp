import { RoutePath } from '../Data/Constants';
import { displayToastify } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { addAdmin, addToken } from '../Features/User/UserSlice';
import { AuthService } from '../Api/AuthService';

const login = (
    response: any,
    darkTheme: boolean,
    dispatch: any,
    navigate: any,
) => {
    const token = response?.data?.body?.access_token;
    const adminRaw = response?.data?.body?.admin_name;
    // Remove surrounding double quotes if present
    const admin = typeof adminRaw === 'string' ? adminRaw.replace(/^"|"$/g, '') : adminRaw;
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
    try {
        const response = await AuthService.login(data);
        login(response, darkTheme, dispatch, navigate);
    } catch (error) {
        displayToastify(
            'The user name or password are incorrect',
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    }
};
