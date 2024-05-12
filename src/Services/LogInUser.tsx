import axios from 'axios';
import {
    APPPROFILEKEY,
    OFFLINETESTUSERNAMEKEY,
    RoutePath,
} from '../Data/Constants';
import { displayToastify } from '../Utils/HelperFn';
import {
    APPPROFILE,
    OFFLINECRED,
    TOASTIFYCOLOR,
    TOASTIFYSTATE,
} from '../Data/Enum';
import { homeUrl } from '../Api.tsx/HomeApi';
import {
    setAccessToken,
    setAppAdminUser,
} from '../Utils/ProfileConfigHelperFn';

const login = (response: any, navigate: any) => {
    displayToastify(
        `Signing In as ${response?.data?.body?.admin_name?.split('@')[0]}`,
        TOASTIFYCOLOR.DARK,
        TOASTIFYSTATE.SUCCESS,
    );
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
        if (localStorage.getItem(APPPROFILEKEY) === APPPROFILE.STATUSON) {
            response = await axios.post(homeUrl.app_login, data, options);
        } else {
            response = {
                data: {
                    body: {
                        admin_name: localStorage.getItem(
                            OFFLINETESTUSERNAMEKEY,
                        ),
                        access_token: OFFLINECRED.TOKEN,
                    },
                },
            };
        }
        login(response, navigate);
    } catch (error) {
        displayToastify(
            'The user name or password are incorrect',
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
        //catchError(error);
    }
};
