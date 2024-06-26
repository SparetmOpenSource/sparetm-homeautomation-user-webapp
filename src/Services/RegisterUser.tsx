import axios from 'axios';
import { catchError, displayToastify } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';

export const RegisterUser = async (url: any, data: any) => {
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    await axios
        .post(url, data, options)
        .then((response) => {
            displayToastify(
                response?.data?.statusCode,
                TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.SUCCESS,
            );
        })
        .catch((error) => {
            catchError(error);
        });
};
