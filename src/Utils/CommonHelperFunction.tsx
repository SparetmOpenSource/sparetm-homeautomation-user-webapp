import {
    BsSunFill,
    BsCloudSunFill,
    BsCloudFill,
    BsCloudsFill,
    BsCloudRainFill,
    BsCloudRainHeavyFill,
    BsFillCloudLightningRainFill,
    BsSnow2,
} from 'react-icons/bs';
import { RiMistLine } from 'react-icons/ri';

/*{-----------------------------------------------Change Range------------------------------------------------------}*/

export const convertTheRange = (
    currentValue: any,
    in_min: any,
    in_max: any,
    out_min: any,
    out_max: any,
) => {
    let result =
        ((currentValue - in_min) * (out_max - out_min)) / (in_max - in_min) +
        out_min;
    return result;
};

/*{-----------------------------------------------Change String------------------------------------------------------}*/

// export const camalize = (str: any) => {
//     return str
//         .toLowerCase()
//         .replace(/[^a-zA-Z0-9]+(.)/g, (m: any, chr: any) => chr.toUpperCase());
// };
// export const capitalizeFirstLetter=(string:any)=> {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

export const changeWeatherIcon = (iconCode:string) => {
    let icon: any;
    switch (iconCode) {
        case '01d':
        case '01n':
            icon = <BsSunFill />;
            break;
        case '02d':
        case '02n':
            icon = <BsCloudSunFill />;
            break;
        case '03d':
        case '03n':
            icon = <BsCloudFill />;
            break;
        case '04d':
        case '04n':
            icon = <BsCloudsFill />;
            break;
        case '09d':
        case '09n':
            icon = <BsCloudRainFill />;
            break;
        case '10d':
        case '10n':
            icon = <BsCloudRainHeavyFill />;
            break;
        case '11d':
        case '11n':
            icon = <BsFillCloudLightningRainFill />;
            break;
        case '13d':
        case '13n':
            icon = <BsSnow2 />;
            break;
        case '50d':
        case '50n':
            icon = <RiMistLine />;
            break;
        default:
            icon = '';
            break;
    }

    return icon;
};
