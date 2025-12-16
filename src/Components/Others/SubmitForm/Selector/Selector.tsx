import { dark_colors, light_colors } from "../../../../Data/ColorConstant";
import { useTheme } from "../../../../Pages/ThemeProvider";
import TextBlinkAnimation from "../../TextBlinkAnimation/TextBlinkAnimation";
import "./Selector.css";
import Button from "../../CustomButton/Button";
import Select from "react-select";
import { useReactQuery_Get } from "../../../../Api.tsx/useReactQuery_Get";
import { SELECT_COUNTRY_LIST_QUERY_ID } from "../../../../Data/QueryConstant";
import { getCountryList } from "../../../../Api.tsx/ProfileConfigApis";
import { getMergedHeadersForLocation } from "../../../../Api.tsx/Axios";

const Selector = ({ heading, subHeading, formList, submit, switchForm, btnLabel }: any) => {
    const darkTheme: any = useTheme();
    // Derived state for color - prevents flicker
    const color = darkTheme ? dark_colors : light_colors;

    const on_success = (data: any) => { console.log(data) };
    const on_error = () => { };

    // Use memoized header config to avoid re-creation
    const headerConfig = {
        headers: getMergedHeadersForLocation('bEltb0FxY3dhajRDa3NxS1JMcUpMZ3ZDemV3emtBdzdIcm1Fa292bg==')
    };

    // Custom styles for react-select to match the theme
    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            background: color?.element,
            color: color?.text,
            // Match Form.css: border: 3px solid grey (default) / orange (focus)
            border: state.isFocused ? '3px solid orange' : '3px solid grey',
            borderRadius: '0.5rem',
            padding: '0.6em', // Slightly reduced from 1em as requested
            fontSize: '1rem', // Match Form.css
            lineHeight: '24px', // Match Form.css
            outlineOffset: '5px', // Match Form.css
            boxShadow: 'none', 
            transition: '0.5s all ease', // Match Form.css transition
            '&:hover': {
                border: '3px solid orange', // Match hover behavior if desired, or keep generic
            },
        }),
        menu: (base: any) => ({
            ...base,
            background: color?.element,
            color: color?.text,
            zIndex: 9999, // Ensure dropdown is on top
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused ? color?.hover : color?.element,
            color: color?.text,
            ':active': {
                backgroundColor: color?.button,
            },
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: '0', // Remove internal padding so control padding (1em) dictates layout
            margin: '0',
        }),
        singleValue: (base: any) => ({
            ...base,
            color: color?.text,
            margin: '0',
            padding: '0',
        }),
        input: (base: any) => ({
            ...base,
            color: color?.text,
            margin: '0',
            padding: '0',
        }),
        placeholder: (base: any) => ({
            ...base,
            color: color?.icon,
            margin: '0',
            padding: '0',
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: color?.inner,
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: color?.text,
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            color: color?.text,
            ':hover': {
                backgroundColor: color?.error,
                color: 'white',
            },
        }),
    };

    const getCountryDataFn = () => {
        return getCountryList(headerConfig, darkTheme);
    };

    const { isLoading, data } = useReactQuery_Get(
        SELECT_COUNTRY_LIST_QUERY_ID,
        getCountryDataFn,
        on_success,
        on_error,
        true, // !fetch_On_Click_Status
        false, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        300000, // Stale Time
    );

    const buttonList: Record<string, any> = [
        {
            id: 1,
            label: btnLabel,
            fn: submit,
        },
        {
            id: 2,
            label: 'back',
            fn: () => switchForm((prev: boolean) => !prev),
        },
    ]

    return (
        <div className="submitSelectorForm">
            <div
                className="submitSelectorForm-wrapper"
                style={{ backgroundColor: color?.outer }}
            >
                {heading && <div className="submitSelectorForm-heading">
                    <h1>
                        {heading?.split('')?.map((letter: any, index: any) => {
                            return (
                                <TextBlinkAnimation
                                    key={index}
                                    color={color?.text}
                                    size="calc(35px + (45 - 35) * ((100vw - 1280px) / (1600 - 1280)))"
                                    height="27px"
                                    weight="700"
                                    opacity="1" 
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </TextBlinkAnimation>
                            );
                        })}
                    </h1>
                </div>}
                {subHeading && (
                    <p className="submitSelectorForm-subHeading" style={{ color: color?.text }}>
                        {subHeading}
                    </p>
                )}
                <section className="submitSelectorForm-field-wrapper">
                    <Select
                        ref={formList[0]?.resetRef}
                        styles={customStyles}
                        className="submitSelectorForm-field"
                        classNamePrefix="select"
                        closeMenuOnSelect={false}
                        isMulti={formList[0]?.isMulti}
                        placeholder={formList[0]?.label}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isSearchable={true}
                        getOptionLabel={(option: { label: string }) => option?.label}
                        getOptionValue={(e) => (e as any)?.value}
                        options={formList[0]?.option || []}
                        onChange={formList[0]?.onChangeFn || (() => { })}
                    />

                    <Select
                        ref={formList[1]?.resetRef}
                        styles={customStyles}
                        className='submitSelectorForm-field'
                        classNamePrefix="select"
                        closeMenuOnSelect={true}
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        isClearable={true}
                        isSearchable={true}
                        isMulti={formList[1]?.isMulti}
                        placeholder={formList[1]?.label}
                        getOptionLabel={(e) => (e as any)?.name}
                        getOptionValue={(e) => (e as any)?.name}
                        options={data?.data?.body || []}
                        onChange={formList[1]?.onChangeFn || (() => { })}
                    />

                    <Select
                        ref={formList[2]?.resetRef}
                        styles={customStyles}
                        className='submitSelectorForm-field'
                        classNamePrefix="select"
                        closeMenuOnSelect={true}
                        isDisabled={false}
                        isLoading={formList[2]?.isLoading}
                        isClearable={true}
                        isSearchable={true}
                        isMulti={formList[2]?.isMulti}
                        placeholder={formList[2]?.label}
                        getOptionLabel={(e) => (e as any)?.name}
                        getOptionValue={(e) => (e as any)?.name}
                        options={formList[2]?.option || []}
                        onChange={formList[2]?.onChangeFn || (() => { })}
                    />

                    <Select
                        ref={formList[3]?.resetRef}
                        styles={customStyles}
                        className='submitSelectorForm-field'
                        classNamePrefix="select"
                        closeMenuOnSelect={true}
                        isDisabled={false}
                        isLoading={formList[3]?.isLoading}
                        isClearable={true}
                        isSearchable={true}
                        isMulti={formList[3]?.isMulti}
                        placeholder={formList[3]?.label}
                        getOptionLabel={(e) => (e as any)?.name}
                        getOptionValue={(e) => (e as any)?.name}
                        options={formList[3]?.option || []}
                        onChange={formList[3]?.onChangeFn || (() => { })}
                    />
                </section>
                <section className="submitSelectorForm-button">
                    {buttonList?.map((item: any) => (
                        <Button
                            key={item?.id}
                            label={item?.label}
                            textCol={color?.button}
                            backCol={color?.inner}
                            backColOnDis={color?.element}
                            width="150px"
                            status={false}
                            border={color?.button}
                            fn={item?.fn}
                        />))}
                </section>
            </div>
        </div >
    );
};
export default Selector;