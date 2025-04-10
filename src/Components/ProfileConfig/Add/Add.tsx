import { useEffect, useRef, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import './Add.css';
import {
    NONPREMIUMROOMCOUNT,
    ProfileConfigRoomNames,
    RoutePath,
} from '../../../Data/Constants';
import { useNavigate } from 'react-router-dom';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import { catchError, displayToastify } from '../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';
import {
    getCityList,
    getStateList,
    profileUrl,
    successMessage,
} from '../../../Api.tsx/ProfileConfigApis';
import { useAppSelector } from '../../../Features/ReduxHooks';
import {
    SELECT_CITY_LIST_QUERY_ID,
    SELECT_STATE_LIST_QUERY_ID,
} from '../../../Data/QueryConstant';
import { getMergedHeadersForLocation, updateHeaderConfig } from '../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../Api.tsx/useReactQuery_Update';
import Building from "./../../../Assets/Building.svg";
import Form from '../../Others/SubmitForm/Form/Form';
import Selector from '../../Others/SubmitForm/Selector/Selector';

const Add = () => {
    const navigate = useNavigate();
    const [color, setColor] = useState<any>(light_colors);
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const darkTheme: any = useTheme();
    const [countryIso, setCountryIso] = useState();
    const [stateIso, setStateIso] = useState();
    const [country, setCountry] = useState();
    const [countryCode, setCountryCode] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [room, setRoom] = useState([]);
    const [formData, setFormData] = useState<any>({});
    const [formChange, setFormChange] = useState(false);
    const roomSelectInputRef: any = useRef();
    const countrySelectInputRef: any = useRef();
    const stateSelectInputRef: any = useRef();
    const citySelectInputRef: any = useRef();

    const onClear = () => {
        roomSelectInputRef?.current?.clearValue();
        countrySelectInputRef?.current?.clearValue();
        stateSelectInputRef?.current?.clearValue();
        citySelectInputRef?.current?.clearValue();
    };

    const addRoomData = (el: any) => {
        setRoom(el);
    };
    const addCityData = (el: any) => {
        setCity(el?.name);
    };
    const addStateData = (el: any) => {
        setState(el?.name);
        setStateIso(el?.iso2);
    };
    const addCountryData = (el: any) => {
        setCountryCode(el?.phonecode);
        setCountry(el?.name);
        setCountryIso(el?.iso2);
    };
    const processFormData = (data: any) => {
        setFormData(data);
        setFormChange((prev) => !prev);
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

    const on_City_Success = () => { };
    const on_State_Success = () => { };

    const getHeaderConfig = {
        headers: getMergedHeadersForLocation('bEltb0FxY3dhajRDa3NxS1JMcUpMZ3ZDemV3emtBdzdIcm1Fa292bg==')
    };

    const cityFn = () => {
        return getCityList(getHeaderConfig, countryIso, stateIso, darkTheme);
    };
    const stateFn = () => {
        return getStateList(getHeaderConfig, countryIso, darkTheme);
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

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps


    const on_AddProfile_Success = () => {
        displayToastify(
            `${successMessage.profile_added}`,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.SUCCESS,
        );
        navigate(RoutePath.SelectProfileConfig);
    };

    const on_AddProfile_Error = (error: any) => {
        catchError(error, darkTheme);
    };

    const { mutate } = usePostUpdateData(
        `${profileUrl.add_profile} ${admin}`,
        updateHeaderConfig,
        on_AddProfile_Success,
        on_AddProfile_Error,
    );

    const handleSubmit = () => {
        Object.assign(
            formData,
            { countryName: country },
            { countryCode: countryCode },
            { stateName: state },
            { cityName: city },
            { room: room },
        );
        if (
            room.length > NONPREMIUMROOMCOUNT ||
            room.length === 0 ||
            city === undefined ||
            state === undefined ||
            country === undefined
        ) {
            if (room.length > NONPREMIUMROOMCOUNT) {
                displayToastify(
                    `Room count cannot exceed ${NONPREMIUMROOMCOUNT}`,
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
            mutate(formData);
            onClear();
        }
    };

    useEffect(() => {
        if (room.length > NONPREMIUMROOMCOUNT) {
            displayToastify(
                `Room count cannot exceed ${NONPREMIUMROOMCOUNT} for non premium members`,
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
            id: 1,
            isMulti: true,
            label: 'select room type*',
            option: ProfileConfigRoomNames,
            onChangeFn: addRoomData,
            resetRef: roomSelectInputRef,
        },
        {
            id: 2,
            formFormat: 'Selection',
            isMulti: false,
            label: 'select your country*',
            option: {},
            onChangeFn: addCountryData,
            resetRef: countrySelectInputRef,
        },
        {
            id: 3,
            formFormat: 'Selection',
            isMulti: false,
            label: 'select your state*',
            option: selectedStateList?.data?.body,
            onChangeFn: addStateData,
            resetRef: stateSelectInputRef,
        },
        {
            id: 4,
            formFormat: 'Selection',
            isMulti: false,
            label: 'select your city*',
            option: selectedCityList?.data?.body,
            onChangeFn: addCityData,
            resetRef: citySelectInputRef,
        },
    ];

    const formList: Record<string, any> = [
        {
            id: 1,
            type: 'profile name',
            placeholder: 'Enter profile name*',
            keyName: 'profileName',
            minLength: 3,
            maxLength: 36,
            regex: undefined
        },
        {
            id: 2,
            type: 'mobile number',
            placeholder: 'Enter mobile number (without country code)*',
            keyName: 'mobileNumber',
            minLength: 6,
            maxLength: 12,
            regex: /^\d{10}(\d{2})?$/
        },
    ];

    return (
        <div className="add">
            <section style={{ backgroundColor: color?.element }}>
                <img
                    className="spotify-expand-content-home-spotify-img"
                    src={Building}
                    height="80%"
                    width="80%"
                    loading="lazy"
                    alt="song_image"
                /></section>
            <section style={{ backgroundColor: color?.inner }}>
                {!formChange && (
                    <Form
                        heading="Create your home!"
                        subHeading="Submit to Start Your Automation Journey!"
                        formData={processFormData}
                        formList={formList}
                        btnLabel="go ahead"
                    />

                )}
                {formChange && (
                    <Selector
                        heading="Let us know where you are"
                        // subHeading="and we’ll do the rest!"
                        formList={selectorList}
                        submit={handleSubmit}
                        switchForm={setFormChange}
                        btnLabel="submit"
                    />
                )}
            </section>
        </div>
    );
};

export default Add;