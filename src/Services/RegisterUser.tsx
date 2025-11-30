import axios from 'axios';
import { catchError, displayToastify } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';

export const RegisterUser = async (url: any, data: any, darkTheme: boolean) => {
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    await axios
        .post(url, data, options)
        .then(() => {
            displayToastify(
                'Congratulations, your account has been successfully created.',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.SUCCESS,
            );
        })
        .catch((error) => {
            catchError(error, darkTheme);
        });
};
