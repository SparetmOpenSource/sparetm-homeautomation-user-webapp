import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../../core/router/themeprovider';
import { dark_colors, light_colors } from '../../../../../data/colorconstant';
import {
    NONPREMIUMROOMCOUNT,
    ProfileConfigRoomNames,
    RoutePath,
} from '../../../../../data/constants';
import './add.css';

import Building from '../../../../../assets/desktop.webp';
import {
    getMergedHeadersForLocation,
} from '../../../../../core/api/axios';
import {
    successMessage,
    useAddProfile,
    useCityList,
    useCountryList,
    useStateList
} from '../../../../../core/api/profileconfigapis';
import { useAppSelector } from '../../../../../core/store/reduxhooks';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../data/enum';
import DynamicForm, { FieldConfig } from '../../../../../shared/commoncomponents/dynamicform/dynamicform';
import { displayToastify } from '../../../../../utils/helperfn';

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

    const headerConfig = useMemo(() => ({
        headers: getMergedHeadersForLocation(
            process.env.REACT_APP_LOCATION_API_KEY,
        ),
    }), []);

    const { data: countryList } = useCountryList(headerConfig, darkTheme, { enabled: formChange });
    const { data: selectedStateList, refetch: fetchState, isFetching: isStateLoading } = useStateList(headerConfig, countryIso, darkTheme, { enabled: formChange && !!countryIso });
    const { data: selectedCityList, refetch: fetchCity, isFetching: isCityLoading } = useCityList(headerConfig, countryIso, stateIso, darkTheme, { enabled: formChange && !!stateIso });

    const on_AddProfile_Success = () => {
        displayToastify(
            `${successMessage.profile_added}`,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.SUCCESS,
        );
        navigate(RoutePath.SelectProfileConfig);
    };


    const { mutate } = useAddProfile(admin, darkTheme, on_AddProfile_Success);

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
