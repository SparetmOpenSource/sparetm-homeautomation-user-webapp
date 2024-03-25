import axios from 'axios';
import {
    APPPROFILEKEY,
    OFFLINETESTUSERNAMEKEY,
    RoutePath,
} from '../Data/Constants';
import { catchError } from '../Utils/HelperFn';
import { APPPROFILE, OFFLINECRED } from '../Data/Enum';
import { homeUrl } from '../Api.tsx/HomeApi';
import { setAccessToken, setAppAdminUser } from '../Utils/ProfileConfigHelperFn';

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
        if (localStorage.getItem(APPPROFILEKEY) === APPPROFILE.STATUSON) {
            response = await axios.post(
                homeUrl.app_login,
                data,
                options,
            );
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
        catchError(error);
    }
};



 



