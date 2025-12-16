import { useEffect, useState, useMemo } from 'react';
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
    getCountryList,
    profileUrl,
    successMessage,
} from '../../../Api.tsx/ProfileConfigApis';
import { useAppSelector } from '../../../Features/ReduxHooks';
import {
    SELECT_CITY_LIST_QUERY_ID,
    SELECT_STATE_LIST_QUERY_ID,
    SELECT_COUNTRY_LIST_QUERY_ID,
} from '../../../Data/QueryConstant';
import {
    getMergedHeadersForLocation,
    updateHeaderConfig,
} from '../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../Api.tsx/useReactQuery_Update';
import Building from './../../../Asset/desktop.webp';
import DynamicForm, { FieldConfig } from '../../Others/DynamicForm/DynamicForm';

const Add = () => {
    const navigate = useNavigate();
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const darkTheme: any = useTheme();
    // Derived state for color - prevents flicker
    const color = darkTheme ? dark_colors : light_colors;
    
    // Step 1 State
    const [profileData, setProfileData] = useState<any>({});
    
    // Step 2 State
    const [countryIso, setCountryIso] = useState();
    const [stateIso, setStateIso] = useState();
    const [country, setCountry] = useState();
    const [countryCode, setCountryCode] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [room, setRoom] = useState<any[]>([]);
    
    // UI State
    const [formChange, setFormChange] = useState(false);

    // Callbacks for Selector onChange Logic
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

    const processProfileData = (data: any) => {
        setProfileData(data);
        setFormChange(true); // Switch to Step 2
    };

    const displayError = (message: string) => {
        displayToastify(
            message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const on_City_Error = (error: any) => displayError(error?.message);
    const on_State_Error = (error: any) => displayError(error?.message);
    const on_Country_Error = (error: any) => displayError(error?.message);

    const on_City_Success = () => {};
    const on_State_Success = () => {};
    const on_Country_Success = () => {};

    // Use memoized header config to avoid re-creation
    const headerConfig = useMemo(() => ({
        headers: getMergedHeadersForLocation(
            'bEltb0FxY3dhajRDa3NxS1JMcUpMZ3ZDemV3emtBdzdIcm1Fa292bg==',
        ),
    }), []);

    const cityFn = () => {
        return getCityList(headerConfig, countryIso, stateIso, darkTheme);
    };
    const stateFn = () => {
        return getStateList(headerConfig, countryIso, darkTheme);
    };
    const countryFn = () => {
        return getCountryList(headerConfig, darkTheme);
    };

    const { data: countryList } = useReactQuery_Get(
        SELECT_COUNTRY_LIST_QUERY_ID,
        countryFn,
        on_Country_Success,
        on_Country_Error,
        true, // !fetch_On_Click_Status (Fetch immediately)
        false, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, 
        300000, 
    );

    const { data: selectedCityList, refetch: fetchCity, isFetching: isCityLoading } = useReactQuery_Get(
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
    const { data: selectedStateList, refetch: fetchState, isFetching: isStateLoading } = useReactQuery_Get(
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

    // Final Submit Handler
    const handleFinalSubmit = () => {
        const fullFormData = {
            ...profileData, // Step 1 data
            countryName: country,
            countryCode: countryCode,
            stateName: state,
            cityName: city,
            room: room,
        };

        // Validation Logic
        if (room.length === 0) {
           displayError('Please add at least one room');
           return;
        }
        
        if (room.length > NONPREMIUMROOMCOUNT) {
            displayError(`Room count cannot exceed ${NONPREMIUMROOMCOUNT}`);
            return;
        }

        if (!city || !state || !country) {
            displayError('Location (Country, State, City) is required.');
            return;
        }

        mutate(fullFormData);
    };

    useEffect(() => {
        if (room.length > NONPREMIUMROOMCOUNT) {
            displayError(`Room count cannot exceed ${NONPREMIUMROOMCOUNT} for non premium members`);
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

    // --- Dynamic Form Configurations ---

    // Step 1: Profile Details Form
    const profileFormFields: FieldConfig[] = [
        {
            id: 1,
            name: 'profileName',
            type: 'text',
            label: 'Enter profile name*',
            validation: {
                required: 'Profile name is required',
                minLength: { value: 3, message: 'Profile Name is too short' },
                maxLength: { value: 36, message: 'Profile Name is too long' },
            }
        },
        {
            id: 2,
            name: 'mobileNumber',
            type: 'mobile number', // Uses internal DynamicForm regex for mobile
            label: 'Enter mobile number (without country code)*',
            validation: {
                required: 'Mobile number is required',
                minLength: { value: 6, message: 'Mobile number is too short' },
                maxLength: { value: 12, message: 'Mobile number is too long' },
            }
        },
    ];

    // Step 2: Location Form
    const locationFormFields: FieldConfig[] = [
        {
            id: 1,
            name: 'room',
            type: 'select',
            label: 'select room type*',
            options: ProfileConfigRoomNames,
            isMulti: true,
            onChangeFn: addRoomData,
        },
        {
            id: 2,
            name: 'country',
            type: 'select',
            label: 'select your country*',
            options: countryList?.data?.body,
            onChangeFn: addCountryData,
        },
        {
            id: 3,
            name: 'state',
            type: 'select',
            label: 'select your state*',
            options: selectedStateList?.data?.body,
            onChangeFn: addStateData,
            isLoading: isStateLoading,
        },
        {
            id: 4,
            name: 'city',
            type: 'select',
            label: 'select your city*',
            options: selectedCityList?.data?.body,
            onChangeFn: addCityData,
            isLoading: isCityLoading,
        }
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
                />
            </section>
            <section style={{ backgroundColor: color?.inner }}>
                {!formChange && (
                    <DynamicForm
                        heading="Create your home!"
                        subHeading="Submit to Start Your Automation Journey!"
                        fields={profileFormFields}
                        onSubmit={processProfileData}
                        submitLabel="go ahead"
                    />
                )}
                {formChange && (
                    <DynamicForm
                        heading="Let us know where you are"
                        fields={locationFormFields}
                        onSubmit={handleFinalSubmit}
                        submitLabel="submit"
                        secondaryButtons={[
                            {
                                id: 1,
                                label: 'back',
                                onClick: () => setFormChange(false)
                            }
                        ]}
                    />
                )}
            </section>
        </div>
    );
};

export default Add;
