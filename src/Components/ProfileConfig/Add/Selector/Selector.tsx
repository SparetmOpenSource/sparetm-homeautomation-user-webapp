import { useEffect, useState } from 'react';
import Button from '../../../Others/CustomButton/Button';
import './Selector.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useTheme } from '../../../../Pages/ThemeProvider';
import makeAnimated from 'react-select/animated';
import Select, { createFilter } from 'react-select';
import TextBlinkAnimation from '../../../Others/TextBlinkAnimation/TextBlinkAnimation';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import { SELECT_COUNTRY_LIST_QUERY_ID } from '../../../../Data/QueryConstant';
import {
    cityCountryState_headers,
    CountryStateCityApiKey,
    getCountryList,
} from '../../../../Api.tsx/ProfileConfigApis';
import { displayToastify } from '../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';

const Selector = ({ heading, list, btnLabel, submit, setFormChange }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const animatedComponents = makeAnimated();
    const [ignoreCase] = useState(true);
    const [ignoreAccents] = useState(false);
    const [trim] = useState(true);
    const [matchFromStart] = useState(true);
    const sentence = heading?.split('');

    const filterConfig = {
        ignoreCase,
        ignoreAccents,
        trim,
        matchFrom: matchFromStart ? ('start' as const) : ('any' as const),
    };

    const SelectStyles = {
        option: (styles: any, { isFocused, isSelected }: any) => ({
            ...styles,
            background: isFocused
                ? color?.outer
                : isSelected
                ? color?.element
                : undefined,
            color: isFocused
                ? color?.text
                : isSelected
                ? color?.icon
                : undefined,
            zIndex: 1,
        }),

        menuList: (styles: any) => ({
            ...styles,
            background: color?.inner,
            color: color?.text,
        }),

        control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            color: color?.button,
            borderColor: state.isFocused ? 'orange' : 'grey',
            backgroundColor: state.isFocused ? 'white' : color?.element,
            borderRadius: 8,
            border: state.isFocused
                ? '3px solid orange'
                : state.isSelected
                ? '3px solid green'
                : '3px solid grey',
            padding: '0.3em',
            transition: state.isFocused ? '0.5s all ease' : '0.1s all ease',
        }),
    };

    const countryFn = () => {
        return getCountryList(cityCountryState_headers, darkTheme);
    };

    const on_Country_Success = (data:any) => {
        console.log(data);
    };
    const on_Country_Error = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const { data: countryList } = useReactQuery_Get(
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

    return (
        <div className="selector">
            <div
                className="selector-wrapper"
                style={{ backgroundColor: color?.outer }}
            >
                <div className="selector-heading">
                    <h1>
                        {sentence.map((letter: any, index: any) => {
                            return (
                                <TextBlinkAnimation
                                    key={index}
                                    color={color?.text}
                                    size="calc(35px + (45 - 35) * ((100vw - 1280px) / (1600 - 1280)))"
                                    height="27px"
                                    weight="700"
                                    opacity="0.5"
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </TextBlinkAnimation>
                            );
                        })}
                    </h1>
                </div>

                <span>
                    <Select
                        ref={list[0]?.resetRef}
                        className="selector-select"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti={list[0]?.isMulti}
                        placeholder={list[0]?.label}
                        options={list[0]?.option}
                        onChange={list[0]?.onChangeFn}
                        filterOption={createFilter(filterConfig)}
                        styles={SelectStyles}
                    />

                    <Select
                        ref={list[1]?.resetRef}
                        className="selector-select"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        isMulti={list[1]?.isMulti}
                        placeholder={list[1]?.label}
                        getOptionLabel={(e) => (e as any)?.[list[1]?.keyName]}
                        getOptionValue={(e) => (e as any)?.[list[1]?.keyName]}
                        options={countryList?.data}
                        onChange={list[1]?.onChangeFn}
                        filterOption={createFilter(filterConfig)}
                        styles={SelectStyles}
                    />

                    <Select
                        ref={list[2]?.resetRef}
                        className="selector-select"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        isMulti={list[2]?.isMulti}
                        placeholder={list[2]?.label}
                        getOptionLabel={(e) => (e as any)?.[list[2]?.keyName]}
                        getOptionValue={(e) => (e as any)?.[list[2]?.keyName]}
                        options={list[2]?.option}
                        onChange={list[2]?.onChangeFn}
                        filterOption={createFilter(filterConfig)}
                        styles={SelectStyles}
                    />

                    <Select
                        ref={list[3]?.resetRef}
                        className="selector-select"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        isMulti={list[3]?.isMulti}
                        placeholder={list[3]?.label}
                        getOptionLabel={(e) => (e as any)?.[list[3]?.keyName]}
                        getOptionValue={(e) => (e as any)?.[list[3]?.keyName]}
                        options={list[3]?.option}
                        onChange={list[3]?.onChangeFn}
                        filterOption={createFilter(filterConfig)}
                        styles={SelectStyles}
                    />
                </span>

                <section className="selector-btn">
                    <Button
                        label={btnLabel}
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="150px"
                        status={false}
                        border={color?.button}
                        fn={submit}
                    />
                    <Button
                        label="back"
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="150px"
                        status={false}
                        border={color?.button}
                        fn={() => setFormChange(false)}
                    />
                </section>
            </div>
        </div>
    );
};

export default Selector;
