import { useEffect, useRef, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import './Add.css';
import SubmitForm from '../../Others/SubmitForm/SubmitForm';
import {
    colorNotificationStatus,
    ProfileConfigRoomNames,
    RoutePath,
} from '../../../Data/Constants';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import { catchError, displayToastify } from '../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';
import {
    getCityList,
    getCountryList,
    getStateList,
    profileUrl,
    successMessage,
} from '../../../Api.tsx/ProfileConfigApis';
import Selector from './Selector/Selector';
import { useAppSelector } from '../../../Features/ReduxHooks';
import {
    SELECT_CITY_LIST_QUERY_ID,
    SELECT_COUNTRY_LIST_QUERY_ID,
    SELECT_STATE_LIST_QUERY_ID,
} from '../../../Data/QueryConstant';
import { useColorNotification } from '../../../App';
import { useUpdateData } from '../../../Api.tsx/useReactQuery_Update';

const Add = () => {
    const roomCount = 6;
    const navigate = useNavigate();
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const tokenData: any = useOutletContext();
    const [country, setCountry] = useState();
    const [countryCode, setCountryCode] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [room, setRoom] = useState([]);
    const [submitData, setSubmitData] = useState<any>();
    const [formChange, setFormChange] = useState(false);
    const roomSelectInputRef: any = useRef();
    const countrySelectInputRef: any = useRef();
    const stateSelectInputRef: any = useRef();
    const citySelectInputRef: any = useRef();
    const handleColorNotificationChange = useColorNotification();

    const cityCountryState_headers = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${tokenData}`,
        },
    };
    const on_City_Error = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const on_State_Error = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const on_Country_Error = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const on_City_Success = () => {};
    const on_State_Success = () => {};
    const on_Country_Success = () => {};
    const cityFn = () => {
        return getCityList(cityCountryState_headers, state, darkTheme);
    };
    const stateFn = () => {
        return getStateList(cityCountryState_headers, country, darkTheme);
    };
    const countryFn = () => {
        return getCountryList(cityCountryState_headers, darkTheme);
    };

    const { data: selectedCityList, refetch: fetchCity } = useReactQuery_Get(
        SELECT_CITY_LIST_QUERY_ID,
        cityFn,
        on_City_Success,
        on_City_Error,
        false, // !fetch_On_Click_Status
        false, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );
    const { data: selectedStateList, refetch: fetchState } = useReactQuery_Get(
        SELECT_STATE_LIST_QUERY_ID,
        stateFn,
        on_State_Success,
        on_State_Error,
        false, // !fetch_On_Click_Status
        false, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );
    const { data: selectedCountryList } = useReactQuery_Get(
        SELECT_COUNTRY_LIST_QUERY_ID,
        countryFn,
        on_Country_Success,
        on_Country_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    var addRoomData = (el: any) => {
        setRoom(el);
    };

    var addCityData = (el: any) => {
        setCity(el?.city_name);
    };
    var addStateData = (el: any) => {
        setState(el?.state_name);
    };
    var addCountryData = (el: any) => {
        setCountryCode(el?.country_phone_code);
        setCountry(el?.country_name);
    };

    const handleInputData = (data: any) => {
        setSubmitData(data);
        setFormChange((prev) => !prev);
    };

    const on_AddProfile_Success = () => {
        handleColorNotificationChange(colorNotificationStatus[0]);
        displayToastify(
            `${successMessage.profile_added}`,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.SUCCESS,
        );
        navigate(RoutePath.SelectProfileConfig);
    };
    const on_AddProfile_Error = (error: any) => {
        handleColorNotificationChange(colorNotificationStatus[1]);
        catchError(error, darkTheme);
    };

    const { mutate } = useUpdateData(
        `${profileUrl.add_profile} ${admin}`,
        on_AddProfile_Success,
        on_AddProfile_Error,
    );

    const onClear = () => {
        roomSelectInputRef?.current?.clearValue();
        countrySelectInputRef?.current?.clearValue();
        stateSelectInputRef?.current?.clearValue();
        citySelectInputRef?.current?.clearValue();
    };

    const handleSubmit = () => {
        Object.assign(
            submitData,
            { countryName: country },
            { countryCode: countryCode },
            { stateName: state },
            { cityName: city },
            { room: room },
        );
        if (
            room.length > roomCount ||
            room.length === 0 ||
            city === undefined ||
            state === undefined ||
            country === undefined
        ) {
            if (room.length > roomCount) {
                displayToastify(
                    `Room count cannot exceed ${roomCount}`,
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.ERROR,
                );
            } else if (room.length === 0) {
                displayToastify(
                    `Please add at least one room`,
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.ERROR,
                );
            } else {
                displayToastify(
                    'Location is required. Please provide a valid entry',
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.ERROR,
                );
            }
        } else {
            mutate(submitData);
            onClear();
        }
    };

    useEffect(() => {
        if (room.length > roomCount) {
            displayToastify(
                `Room count cannot exceed ${roomCount}`,
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        }
    }, [room]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (country !== undefined) {
            fetchState();
        }
    }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (state !== undefined) {
            fetchCity();
        }
    }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

    const selectorList: Record<string, any> = [
        {
            id: 3,
            formFormat: 'Selection',
            isMulti: true,
            label: 'select room type*',
            optionType: 'jsObject',
            keyName: 'room',
            option: ProfileConfigRoomNames,
            onChangeFn: addRoomData,
            resetRef: roomSelectInputRef,
        },
        {
            id: 4,
            formFormat: 'Selection',
            isMulti: false,
            label: 'select your country*',
            optionType: 'api',
            keyName: 'country_name',
            option: selectedCountryList?.data,
            onChangeFn: addCountryData,
            resetRef: countrySelectInputRef,
        },
        {
            id: 5,
            formFormat: 'Selection',
            isMulti: false,
            label: 'select your state*',
            optionType: 'api',
            keyName: 'state_name',
            option: selectedStateList?.data,
            onChangeFn: addStateData,
            resetRef: stateSelectInputRef,
        },
        {
            id: 6,
            formFormat: 'Selection',
            isMulti: false,
            label: 'select your city*',
            optionType: 'api',
            keyName: 'city_name',
            option: selectedCityList?.data,
            onChangeFn: addCityData,
            resetRef: citySelectInputRef,
        },
    ];

    const formList: Record<string, any> = [
        {
            id: 1,
            formFormat: 'Input',
            type: 'profileName',
            placeholder: 'Enter profile name*',
            keyName: 'profileName',
            minLength: 3,
            maxLength: 36,
        },
        {
            id: 2,
            formFormat: 'Input',
            type: 'mobileNumber',
            placeholder: 'Enter mobile number (without country code)*',
            keyName: 'mobileNumber',
            minLength: 3,
            maxLength: 36,
        },
    ];

    return (
        <div className="add">
            <section style={{ backgroundColor: color?.element }}>uo</section>
            <section style={{ backgroundColor: color?.inner }}>
                {!formChange && (
                    <SubmitForm
                        heading="Create your home!"
                        list={formList}
                        setInputData={handleInputData}
                        btnLabel="go ahead"
                    />
                )}
                {formChange && (
                    <Selector
                        heading="Select room and location!"
                        list={selectorList}
                        btnLabel="submit"
                        submit={handleSubmit}
                        setFormChange={setFormChange}
                    />
                )}
            </section>
        </div>
    );
};

export default Add;
