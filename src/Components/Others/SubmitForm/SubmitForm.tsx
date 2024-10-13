import { useForm } from 'react-hook-form';
import './SubmitForm.css';
import Button from '../CustomButton/Button';
import { useEffect, useState } from 'react';
// import Select, { createFilter } from 'react-select';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
// import makeAnimated from 'react-select/animated';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import TextBlinkAnimation from '../TextBlinkAnimation/TextBlinkAnimation';

const SubmitForm = ({ heading, typeChange, type, list, setInputData, btnLabel }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    // const [ignoreCase] = useState(true);
    // const [ignoreAccents] = useState(false);
    // const [trim] = useState(true);
    // const [matchFromStart] = useState(true);
    // const animatedComponents = makeAnimated();
    const [showPassword, setShowPassword] = useState(false);
    const PASSWORDTYPE = 'password';
    const sentence = heading?.split('');

    // const filterConfig = {
    //     ignoreCase,
    //     ignoreAccents,
    //     trim,
    //     matchFrom: matchFromStart ? ('start' as const) : ('any' as const),
    // };

    const {
        register: submitForm,
        formState: { errors: submitFormErrors },
        handleSubmit: handleSubmitForm,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmitForm = (data: any) => {
        setInputData(data);
        reset();
    };

    // const SelectStyles = {
    //     option: (styles: any, { isFocused, isSelected }: any) => ({
    //         ...styles,
    //         background: isFocused
    //             ? color?.outer
    //             : isSelected
    //             ? color?.element
    //             : undefined,
    //         color: isFocused
    //             ? color?.text
    //             : isSelected
    //             ? color?.icon
    //             : undefined,
    //         zIndex: 1,
    //     }),

    //     menuList: (styles: any) => ({
    //         ...styles,
    //         background: color?.inner,
    //         color: color?.text,
    //     }),

    //     control: (baseStyles: any, state: any) => ({
    //         ...baseStyles,
    //         borderColor: state.isFocused ? 'orange' : 'grey',
    //         backgroundColor: state.isFocused ? 'white' : color?.element,
    //         borderRadius: 8,
    //         border: state.isFocused
    //             ? '3px solid orange'
    //             : state.isSelected
    //             ? '3px solid green'
    //             : '3px solid grey',
    //         padding: '0.3em',
    //         transition: state.isFocused ? '0.5s all ease' : '0.1s all ease',
    //     }),
    // };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="submitForm">
            <form
                onSubmit={handleSubmitForm(onSubmitForm)}
                className="submitForm_wrapper"
                style={{ backgroundColor: color?.outer }}
            >
                <div className="submitForm-heading">
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
                {type && (
                    <p style={{ color: color?.text }}>
                        We are really happy to see you again!
                    </p>
                )}

                {list?.map(
                    (item: any) =>
                        item?.formFormat === 'Input' && (
                            <span key={item?.id}>
                                <section className="submitForm_field_wrapper">
                                    <input
                                        type={
                                            item?.type === PASSWORDTYPE
                                                ? showPassword
                                                    ? 'text'
                                                    : PASSWORDTYPE
                                                : item?.type
                                        }
                                        id={item?.id}
                                        className={
                                            item?.type === PASSWORDTYPE
                                                ? 'submitForm_field rearrangeForPassword'
                                                : 'submitForm_field'
                                        }
                                        placeholder={item?.placeholder}
                                        style={{
                                            background: color?.element,
                                            color: color?.text,
                                        }}
                                        {...submitForm(item?.keyName, {
                                            required: `${item?.keyName} is required`,
                                            minLength: {
                                                value: item?.minLength,
                                                message: `${item?.keyName} is too short`,
                                            },
                                            maxLength: {
                                                value: item?.maxLength,
                                                message: `${item?.keyName} is too long`,
                                            },
                                        })}
                                    />
                                    {item?.type === PASSWORDTYPE && (
                                        <motion.div
                                            whileHover={{ scale: 1.0 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="eyeIcon_button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            style={{
                                                backgroundColor: color?.element,
                                            }}
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    size: '2em',
                                                    color: color?.button,
                                                }}
                                            >
                                                {showPassword === true ? (
                                                    <VscEyeClosed />
                                                ) : (
                                                    <VscEye />
                                                )}
                                            </IconContext.Provider>
                                        </motion.div>
                                    )}
                                </section>
                                {submitFormErrors?.[item?.keyName] && (
                                    <p className="submitForm_error">
                                        {
                                            (
                                                submitFormErrors?.[
                                                    item?.keyName
                                                ] as any
                                            )?.message
                                        }
                                    </p>
                                )}
                            </span>
                        ),
                )}

                {/* {list.map(
                    (item: any) =>
                        item?.formFormat === 'Selection' && (
                            <span key={item?.id}>
                                {item?.optionType === 'api' && (
                                    <Select
                                        className="submitForm_select"
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        // isMulti={item?.isMulti}
                                        placeholder={item?.label}
                                        getOptionLabel={(e) =>
                                            (e as any)?.[item?.keyName]
                                        }
                                        getOptionValue={(e) =>
                                            (e as any)?.[item?.keyName]
                                        }
                                        options={item?.option}
                                        onChange={item?.onChangeFn}
                                        filterOption={createFilter(
                                            filterConfig,
                                        )}
                                        styles={SelectStyles}
                                    />
                                )}
                                {item?.optionType === 'jsObject' && (
                                    <Select
                                        className="submitForm_select"
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti={item?.isMulti}
                                        placeholder={item?.label}
                                        options={item?.option}
                                        onChange={item?.onChangeFn}
                                        filterOption={createFilter(
                                            filterConfig,
                                        )}
                                        styles={SelectStyles}
                                    />
                                )}
                            </span>
                        ),
                )} */}

                <span>
                    {Object.keys(submitFormErrors).length === 0 && (
                        <Button
                            label={btnLabel}
                            textCol={color?.button}
                            backCol={color?.inner}
                            backColOnDis={color?.element}
                            width="150px"
                            status={false}
                            border={color?.button}
                        />
                    )}
                </span>
                {typeChange && <motion.p
                    className="submitForm-type-changer"
                    onClick={typeChange}
                    initial={{ scale: 1 }}
                    whileHover={{
                        scale: 1.1,
                        color: color?.button,
                        textDecoration: 'underline',
                    }}
                    whileTap={{
                        scale: 0.95,
                        color: color?.icon_font,
                    }}
                    whileInView={{ color: color?.text }}
                    style={{ cursor: 'pointer' }}
                >
                    {type ? 'New here! Register' : 'Have an account? Sign in'}
                </motion.p>}
            </form>
        </div>
    );
};
export default SubmitForm;
