import { useEffect, useState } from "react";
import { dark_colors, light_colors } from "../../../../Data/ColorConstant";
import { useTheme } from "../../../../Pages/ThemeProvider";
import { useForm } from "react-hook-form";
import TextBlinkAnimation from "../../TextBlinkAnimation/TextBlinkAnimation";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import "./Form.css";
import Button from "../../CustomButton/Button";

const Form = ({ heading, subHeading, formData, formList, switchForm, typeFlag, btnLabel }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const PASSWORDTYPE = 'password';

    const {
        register: submitForm,
        formState: { errors: submitFormErrors },
        handleSubmit: handleSubmitForm,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmitForm = (data: any) => {
        formData(data);
        reset();
    };

    const onSwitchingForm = () => {
        switchForm();
        reset();
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="submitForm">
            <form
                onSubmit={handleSubmitForm(onSubmitForm)}
                className="submitForm-wrapper"
                style={{ backgroundColor: color?.outer }}
            >
                {heading && <div className="submitForm-heading">
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
                    <p className="submitForm-subHeading" style={{ color: color?.text }}>
                        {subHeading}
                    </p>
                )}
                {formList?.map(
                    (item: any) =>
                    (
                        <span key={item?.id}>
                            <section className="submitForm-field-wrapper">
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
                                            ? 'submitForm-field submitForm-rearrangeForPassword'
                                            : 'submitForm-field'
                                    }
                                    placeholder={item?.placeholder}
                                    style={{
                                        background: color?.element,
                                        color: color?.text,
                                    }}
                                    {...submitForm(item?.keyName, {
                                        required: `${item?.type} is required`,
                                        pattern: item?.type === "mobile number" ? {
                                            value: item?.regex,
                                            message: 'Please enter a valid 10/12-digit mobile number',
                                        } : undefined,
                                        minLength: {
                                            value: item?.minLength,
                                            message: `${item?.type} is too short`,
                                        },
                                        maxLength: {
                                            value: item?.maxLength,
                                            message: `${item?.type} is too long`,
                                        },
                                    })}
                                />
                                {item?.type === PASSWORDTYPE && (
                                    <motion.div
                                        whileHover={{ scale: 1.0 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="submitForm-eyeIcon-button"
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
                                <p className="submitForm-error">
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

                <span>
                    {btnLabel && Object.keys(submitFormErrors).length === 0 && (
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
                {switchForm && <motion.p
                    onClick={onSwitchingForm}
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
                    {typeFlag ? 'New here! Register' : 'Have an account? Sign in'}
                </motion.p>}
            </form>
        </div >
    );
};
export default Form;