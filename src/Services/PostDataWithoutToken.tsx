import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/ReactToastify.min.css';

export const PostDataWithoutToken = async (url: any, data: any) => {
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await axios.post(url, data, options);
        // toast.success(response.data.message);
        console.log(response.data);
    } catch (error) {
        let errorDetails = (error as any)?.response.data.message;
        if (typeof errorDetails === 'object' && errorDetails !== null) {
            Object.keys(errorDetails).forEach(function eachKey(key) {
                // toast.error(errorDetails[key]);
            });
        } else {
            // toast.error(errorDetails);
            console.log(errorDetails);
        }
    }
};
