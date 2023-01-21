import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/ReactToastify.min.css';

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
            // toast.success(response.data.message);
            console.log(response.data);
        })
        .catch((error) => {
            let errorDetails = error.response.data.message;
            if (typeof errorDetails === 'object' && errorDetails !== null) {
                Object.keys(errorDetails).forEach(function eachKey(key) {
                    // toast.error(errorDetails[key]);
                });
            } else {
                // toast.error(errorDetails);
            }
        });
};
