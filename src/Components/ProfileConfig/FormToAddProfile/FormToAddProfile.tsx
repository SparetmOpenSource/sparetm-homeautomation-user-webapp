import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import './FormToAddProfile.css';
import TextBlinkAnimation from '../../Others/TextBlinkAnimation/TextBlinkAnimation';
import CustomButton from '../../Others/Button/CustomButton';
import {
    CityUrl,
    CountryUrl,
    ProfileConfigTypography,
    ProfileConfigRoomNames,
    StateUrl,
} from '../../../Data/ProfileConfigConstant';
const animatedComponents = makeAnimated();

const FormToAddProfile = () => {
    const SelectColorStyles = {
        menuList: (styles: any) => ({
            ...styles,
            background: '#1f2123',
            color: '#00FFFF', //color after opening dropdown
        }),
        option: (styles: any, { isFocused, isSelected }: any) => ({
            ...styles,
            background: isFocused
                ? '#2E3438'
                : isSelected
                ? 'rgb(0, 255, 255, 0.2)'
                : undefined,
            zIndex: 1,
        }),
        menu: (base: any) => ({
            ...base,
            zIndex: 100,
        }),
    };
    const [country, setCountry] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [stateList, setStateList] = useState([]);
    const [state, setState] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState(null);
    const [room, setRoom] = useState([]);

    const sentence = ProfileConfigTypography.form_header.split('');
    // let ADMIN = getAppAdminUser();
    const {
        register: profileRegister,
        formState: { errors: proErrors },
        handleSubmit: handleProSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onProSubmit = (data: any) => {
        Object.assign(
            data,
            { countryName: country },
            { countryCode: countryCode },
            { state: state },
            { cityName: city },
            { room: room },
            { picType: 'Man' },
        );
        console.log(data);
        // PostDataWithoutToken(Url.profile_creation_url + ADMIN, data);
        reset();
    };

    var addRooms = (el: any) => {
        setRoom(el);
    };

    var addCountry = (el: any) => {
        setCountryCode(el.country_short_name);
        setCountry(el.country_name);
    };

    var addState = (el: any) => {
        setState(el.state_name);
    };

    var addCity = (el: any) => {
        setCity(el.city_name);
    };

    /********************************************************/

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

    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append(
        'Authorization',
        'Bearer ' + localStorage.getItem('cityCountryStateToken'),
    );

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    };

    const getCountryList = async () => {
        try {
            const response = await fetch(CountryUrl, requestOptions as any);
            const countryList = await response.json();
            return countryList;
        } catch (error) {
            return console.log('error', error);
        }
    };

    useEffect(() => {
        const getStateList = async () => {
            try {
                const response = await fetch(
                    StateUrl + country,
                    requestOptions as any,
                );
                const stateListValue = await response.json();
                setStateList(stateListValue);
            } catch (error) {
                return console.log('error', error);
            }
        };
        getStateList();
    }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getCityList = async () => {
            try {
                const response = await fetch(
                    CityUrl + state,
                    requestOptions as any,
                );
                const cityListValue = await response.json();
                setCityList(cityListValue);
            } catch (error) {
                return console.log('error', error);
            }
        };
        getCityList();
    }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="form" style={{ background: '#25292D' }}>
            <form
                onSubmit={handleProSubmit(onProSubmit)}
                className="form_container"
            >
                <span className="form_heading">
                    <span>
                        {sentence.map((letter, index) => {
                            return (
                                <TextBlinkAnimation
                                    key={index}
                                    color="aqua"
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
                </span>

                {/* ******************************************* */}

                <input
                    type="text"
                    className="form_field"
                    placeholder="Profile name"
                    style={{
                        background: '#1f2123',
                        color: 'lavender',
                    }}
                    {...profileRegister('profileName', {
                        required: 'profile name is required',
                        minLength: {
                            value: 2,
                            message: 'profile name is too short',
                        },
                        maxLength: {
                            value: 8,
                            message: 'profile name is too long',
                        },
                    })}
                />
                {proErrors.profileName && (
                    <p className="form_error">
                        {(proErrors.profileName as any)?.message}
                    </p>
                )}

                {/* ************************************************ */}

                <AsyncSelect
                    className="form_select"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Select Country"
                    cacheOptions
                    defaultOptions
                    getOptionLabel={(e) => (e as any).country_name}
                    getOptionValue={(e) => (e as any).country_name}
                    loadOptions={getCountryList as any}
                    onChange={addCountry}
                    filterOption={createFilter(filterConfig)}
                    styles={SelectColorStyles}
                />

                <Select
                    className="form_select"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Select State"
                    getOptionLabel={(e) => (e as any).state_name}
                    getOptionValue={(e) => (e as any).state_name}
                    options={stateList}
                    onChange={addState}
                    filterOption={createFilter(filterConfig)}
                    styles={SelectColorStyles}
                />

                <Select
                    className="form_select"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Select City"
                    getOptionLabel={(e) => (e as any).city_name}
                    getOptionValue={(e) => (e as any).city_name}
                    options={cityList}
                    onChange={addCity}
                    filterOption={createFilter(filterConfig)}
                    styles={SelectColorStyles}
                />

                {/* ************************************************ */}

                {room.length > 6 && (
                    <p className="form_error">
                        {ProfileConfigTypography.select_room_error}
                    </p>
                )}

                {/* *************************************************** */}

                <Select
                    className="form_select"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    placeholder="Select Room"
                    options={ProfileConfigRoomNames}
                    onChange={addRooms}
                    filterOption={createFilter(filterConfig)}
                    styles={SelectColorStyles}
                />

                {!proErrors.profileName &&
                    !(room.length < 1) &&
                    !(room.length > 6) &&
                    country != null &&
                    state != null &&
                    city != null && (
                        <CustomButton
                            label="Submit"
                            textCol="black"
                            backCol="#e2ff00"
                            width="150px"
                        />
                    )}
            </form>
        </div>
    );
};

export default FormToAddProfile;
