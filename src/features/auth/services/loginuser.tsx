import { useMutation } from 'react-query';
import { AuthService } from '../../../core/api/authservice';
import { RoutePath } from '../../../data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../data/Enum';
import { displayToastify } from '../../../utils/HelperFn';
import { addAdmin, addToken } from '../../profile/store/user/userslice';

export const useLogin = (darkTheme: boolean, dispatch: any, navigate: any) => {
    return useMutation(
        (data: any) => AuthService.login(data),
        {
            onSuccess: (response: any) => {
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
            },
            onError: (error: any) => {
                displayToastify(
                    'The user name or password are incorrect',
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.ERROR,
                );
            }
        }
    );
};
