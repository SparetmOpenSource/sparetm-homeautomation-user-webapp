import axios from 'axios';
import { RoutePath } from '../Data/Constants';
import { Url } from '../Data/LogInUserConstant';
import { catchError,setAccessToken, setAppAdminUser } from '../Utils/HelperFn';
import { APPPROFILE, OFFLINECRED } from '../Data/Enum';

const login = (response: any, navigate: any) => {
    setAccessToken(response);
    setAppAdminUser(response);
    navigate(RoutePath.ProfileConfig);
};

export const LoginUser = async (data: any, navigate: any) => {
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    try {
        let response = null;
        if (localStorage.getItem('appProfile') === APPPROFILE.STATUSON) {
            response = await axios.post(Url.user_login_url, data, options);
        } else {
            response = {
                data: {
                    userName: localStorage.getItem('offlineTestUserName'),
                    token: OFFLINECRED.TOKEN
                }
            }
        }
        login(response, navigate);
    } catch (error) {
        catchError(error);
    }
};
