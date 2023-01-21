import axios from 'axios';
import { Url } from '../Data/HomePageConstant';
import { RoutePath} from './../Data/Constant';
// import { toast } from 'react-toastify';
// import 'react-toastify/ReactToastify.min.css';
import { setAccessToken, setAppAdminUser } from './../Utils/AuthHelperFn';

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
        const response = await axios.post(Url.user_login_url, data, options);
        login(response, navigate);
    } catch (error) {
        let errorDetails = (error as any)?.response.data.message;
        if (typeof errorDetails === 'object' && errorDetails !== null) {
            Object.keys(errorDetails).forEach(function eachKey(key) {
                // toast.error(errorDetails[key]);
            });
        } else {
            // toast.error(errorDetails);
        }
    }
};
