import './FormToAddProfile.css';
import makeAnimated from 'react-select/animated';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import TextBlinkAnimation from '../../../Others/TextBlinkAnimation/TextBlinkAnimation';
import { useNavigate } from 'react-router-dom';
import {
    getCityList,
    getCountryList,
    getStateList,
    successMessage,
    useAddProfiles,
} from '../../../../Api.tsx/ProfileConfigApis';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import { catchError, displayToastify } from '../../../../Utils/HelperFn';
import Button from '../../../Others/CustomButton/Button';
import {
    ProfileConfigRoomNames,
    ProfileConfigTypography,
    RoutePath,
    SelectColorStyles,
} from '../../../../Data/Constants';
import {
    APPPROFILE,
    TOASTIFYCOLOR,
    TOASTIFYSTATE,
} from '../../../../Data/Enum';
import { getAppAdminUser } from '../../../../Utils/ProfileConfigHelperFn';
const animatedComponents = makeAnimated();

const FormToAddProfile = (props: any) => {
    const navigate = useNavigate();
    const [country, setCountry] = useState();
    const [countryCode, setCountryCode] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [room, setRoom] = useState([]);
    const [ignoreCase] = useState(true);
    const [ignoreAccents] = useState(false);
    const [trim] = useState(true);
    const [matchFromStart] = useState(true);
    const filterConfig = {
        ignoreCase,
        ignoreAccents,
        trim,
        matchFrom: matchFromStart ? ('start' as const) : ('any' as const),
    };

    const cityCountryState_headers = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${props?.token}`,
        },
    };
    const on_City_Error = (error: any) => {
        displayToastify(
            error?.message,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const on_State_Error = (error: any) => {
        displayToastify(
            error?.message,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const on_Country_Error = (error: any) => {
        displayToastify(
            error?.message,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const on_City_Success = () => {};
    const on_State_Success = () => {};
    const on_Country_Success = () => {};
    const cityFn = () => {
        return getCityList(cityCountryState_headers, state);
    };
    const stateFn = () => {
        return getStateList(cityCountryState_headers, country);
    };
    const countryFn = () => {
        return getCountryList(cityCountryState_headers);
    };

    const { data: selectedCityList, refetch: fetchCity } = useReactQuery_Get(
        'get_city_list',
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
        'get_state_list',
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
        'get_country_list',
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
    /**********************************************************/
    const sentence = ProfileConfigTypography.form_header.split('');
    const appUser = getAppAdminUser();
    const {
        register: profileRegister,
        formState: { errors: proErrors },
        handleSubmit: handleProSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const handleGoToSelectProfile = () => {
        navigate(RoutePath.SelectProfileConfig);
    };

    /*********************CREATING PROFILE**********************/

    const on_AddProfiles_Success = () => {
        displayToastify(
            `${successMessage.profile_added}`,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.SUCCESS,
        );
        handleGoToSelectProfile();
    };
    const on_AddProfiles_Error = (error: any) => {
        catchError(error);
    };
    const { mutate } = useAddProfiles(
        appUser,
        on_AddProfiles_Success,
        on_AddProfiles_Error,
    );

    /************************************************/

    const onProSubmit = (data: any) => {
        Object.assign(
            data,
            { countryName: country },
            { countryCode: countryCode },
            { stateName: state },
            { cityName: city },
            { room: room },
        );
        if (localStorage.getItem('appProfile') === APPPROFILE.STATUSOFF) {
            displayToastify(
                'You are using the app in offline mode. Please select the profile directly.',
                TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.INFO,
            );
        } else {
            mutate(data); // creating profile
        }
        reset();
    };
    var addRooms = (el: any) => {
        setRoom(el);
    };
    var addCountry = (el: any) => {
        setCountryCode(el.country_phone_code);
        setCountry(el.country_name);
    };
    var addState = (el: any) => {
        setState(el.state_name);
    };
    var addCity = (el: any) => {
        setCity(el.city_name);
    };

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

    return (
        <form
            className="addProfile_form"
            onSubmit={handleProSubmit(onProSubmit)}
        >
            <section>
                <div>
                    <span>
                        {sentence.map((letter, index) => {
                            return (
                                <TextBlinkAnimation
                                    key={index}
                                    color={props.parentColorValue}
                                    size="3rem"
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </TextBlinkAnimation>
                            );
                        })}
                    </span>
                    <p style={{ color: 'lavender' }}>
                        {ProfileConfigTypography.form_subHeader}
                    </p>
                </div>
                <div>
                    <span>
                        <p>Enter your profile name</p>
                        <input
                            type="text"
                            className="addProfile_form_field"
                            placeholder="enter..."
                            {...profileRegister('profileName', {
                                required: 'profile name is required',
                                minLength: {
                                    value: 3,
                                    message: 'profile name is too short',
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'profile name is too long',
                                },
                            })}
                        />
                        {proErrors.profileName && (
                            <p className="addProfile_form_error">
                                {(proErrors?.profileName as any)?.message}
                            </p>
                        )}
                    </span>
                    <span>
                        <p>Select your room type</p>
                        <Select
                            className="addProfile_form_select"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="search or select..."
                            options={ProfileConfigRoomNames}
                            onChange={addRooms}
                            filterOption={createFilter(filterConfig)}
                            styles={SelectColorStyles}
                        />
                        {room.length > 6 && (
                            <p className="addProfile_form_error">
                                {ProfileConfigTypography.select_room_error}
                            </p>
                        )}
                    </span>
                    <span>
                        <p>Enter your mobile number</p>
                        <input
                            type="tel"
                            className="addProfile_form_field"
                            placeholder="enter..."
                            {...profileRegister('mobileNumber', {
                                required: 'mobile Number is required',
                                maxLength: {
                                    value: 11,
                                    message:
                                        'mobile number must be 10 to 11 digit',
                                },
                            })}
                        />
                        {proErrors.mobileNumber && (
                            <p className="addProfile_form_error">
                                {(proErrors?.mobileNumber as any)?.message}
                            </p>
                        )}
                    </span>
                </div>
            </section>
            <section>
                <div>
                    <span>
                        <p>Select your country</p>
                        <Select
                            className="addProfile_form_select"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder="search or select..."
                            getOptionLabel={(e) => (e as any).country_name}
                            getOptionValue={(e) => (e as any).country_name}
                            options={selectedCountryList?.data}
                            onChange={addCountry}
                            filterOption={createFilter(filterConfig)}
                            styles={SelectColorStyles}
                        />
                    </span>
                    <span>
                        <p>Select your state</p>
                        <Select
                            className="addProfile_form_select"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder="search or select..."
                            getOptionLabel={(e) => (e as any).state_name}
                            getOptionValue={(e) => (e as any).state_name}
                            options={selectedStateList?.data}
                            onChange={addState}
                            filterOption={createFilter(filterConfig)}
                            styles={SelectColorStyles}
                        />
                    </span>
                    <span>
                        <p>Select your city</p>
                        <Select
                            className="addProfile_form_select"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder="search or select..."
                            getOptionLabel={(e) => (e as any).city_name}
                            getOptionValue={(e) => (e as any).city_name}
                            options={selectedCityList?.data}
                            onChange={addCity}
                            filterOption={createFilter(filterConfig)}
                            styles={SelectColorStyles}
                        />
                    </span>
                </div>
                <div>
                    {!proErrors.profileName &&
                        !(room.length < 1) &&
                        !(room.length > 6) &&
                        country != null &&
                        state != null &&
                        city != null && (
                            <Button
                                label="Submit"
                                textCol="black"
                                backCol="rgb(8,246,125)"
                                width="150px"
                            />
                        )}
                </div>
            </section>
        </form>
    );
};

export default FormToAddProfile;
