import { useMutation } from 'react-query';
import { AuthService } from '../../../core/api/authservice';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../data/enum';
import { catchError, displayToastify } from '../../../utils/helperfn';

export const useRegister = (darkTheme: boolean) => {
    return useMutation(
        (data: any) => AuthService.register(data),
        {
            onSuccess: () => {
                displayToastify(
                    'Congratulations, your account has been successfully created.',
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.SUCCESS,
                );
            },
            onError: (error: any) => {
                catchError(error, darkTheme);
            }
        }
    );
};
