import { useEffect, useState } from "react";
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
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    const on_success = (data: any) => { console.log(data) };
    const on_error = () => { };

    const getHeaderConfig = {
        headers: getMergedHeadersForLocation('bEltb0FxY3dhajRDa3NxS1JMcUpMZ3ZDemV3emtBdzdIcm1Fa292bg==')
    };

    const getCountryDataFn = () => {
        return getCountryList(getHeaderConfig, darkTheme);
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

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

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
                                    opacity="0.5"
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
                        className='submitSelectorForm-field'
                        classNamePrefix="select"
                        closeMenuOnSelect={true}
                        isDisabled={false}
                        isLoading={false}
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
                        className='submitSelectorForm-field'
                        classNamePrefix="select"
                        closeMenuOnSelect={true}
                        isDisabled={false}
                        isLoading={false}
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