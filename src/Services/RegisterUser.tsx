import { displayToastify, catchError } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { AuthService } from '../Api/AuthService';

export const RegisterUser = async (data: any, darkTheme: boolean) => {
    try {
        await AuthService.register(data);
        displayToastify(
            'Congratulations, your account has been successfully created.',
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.SUCCESS,
        );
    } catch (error) {
        catchError(error, darkTheme);
    }
};
