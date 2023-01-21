import { RoutePath } from './Constant';
import { ImProfile } from 'react-icons/im';
import { AiFillEdit, AiOutlineAppstoreAdd } from 'react-icons/ai';

export const AuthToken =
    'wOhI3LUC6CzqTj8JATleIaFkReJH6qmmnasmDz_xFnSXdd9ZDS-tlNFPO_iHtj0V4e8';
export const OpenWeatherApiKey = '4bf811a36c73b0b190a93be4d9925d4c';
export const AuthEmail = 'sksinghss1998@gmail.com';
export const CountryCityStateUrl =
    'https://www.universal-tutorial.com/api/getaccesstoken';
export const CountryUrl = 'https://www.universal-tutorial.com/api/countries/';
export const CityUrl = 'https://www.universal-tutorial.com/api/cities/';
export const StateUrl = 'https://www.universal-tutorial.com/api/states/';

export const ProfileConfigTypography = {
    form_header: 'Hi, Creative',
    form_subHeader: "Let's create your home with the basic details.",
    select_room_error: 'Max 6 rooms can be added',
};

export const NavigationList = [
    {
        id: 1,
        to: RoutePath.AddProfileConfig,
        icon: <AiOutlineAppstoreAdd />,
        label: 'Add',
    },
    {
        id: 2,
        to: RoutePath.SelectProfileConfig,
        icon: <ImProfile />,
        label: 'Select',
    },
    {
        id: 3,
        to: RoutePath.EditProfileConfig,
        icon: <AiFillEdit />,
        label: 'Edit',
    },
];

export const ProfileConfigRoomNames = [
    { room_type: 'Bathroom', value: 'Bathroom', label: 'Bathroom' },
    { room_type: 'Bedroom', value: 'Bedroom', label: 'Bedroom' },
    { room_type: 'Dining Room', value: 'Dining Room', label: 'Dining Room' },
    { room_type: 'Drawing Room', value: 'Drawing Room', label: 'Drawing Room' },
    { room_type: 'Hall', value: 'Hall', label: 'Hall' },
    { room_type: 'Kitchen', value: 'Kitchen', label: 'Kitchen' },
    { room_type: 'Living Room', value: 'Living Room', label: 'Living Room' },
    {
        room_type: 'Master Bedroom',
        value: 'Master Bedroom',
        label: 'Master Bedroom',
    },
    { room_type: 'Room', value: 'Room', label: 'Room' },
    { room_type: 'Store Room', value: 'Store Room', label: 'Store Room' },
    { room_type: 'Study Room', value: 'Study Room', label: 'Study Room' },
];
