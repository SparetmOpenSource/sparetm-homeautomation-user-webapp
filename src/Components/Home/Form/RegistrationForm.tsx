import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Url } from '../../../Data/HomePageConstant';
import { RegisterUser } from '../../../Services/RegisterUser';
import CustomButton from '../../Others/Button/CustomButton';
import WindowBackdropModel from '../../Others/FramerMotionBackdrop/WindowBackdropModel/WindowBackdropModel';
import Policy from './../Policy/Policy';
import './Form.css';

const RegistrationForm = (props: any) => {

    const [modelOpen, setModelOpen] = useState(false);
    const open = () => {
        setModelOpen(true);
    };
    const close = () => {
        setModelOpen(false);
    };

    const {
        register: registration,
        formState: { errors: regErrors },
        handleSubmit: handleRegSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onRegSubmit = (data: any) => {
        console.log(data);
        RegisterUser(Url.user_registration_url, data);
        reset();
    };
    return (
        <div className="form" style={{ background: '#25292D' }}>
            <form
                onSubmit={handleRegSubmit(onRegSubmit)}
                className="form_wrapper add_css_to_prevent_overflow"
                style={{ background: '#2E3438' }}
            >
                <h1>Sign up</h1>
                {/* ****************************UserName field********************************* */}

                <input
                    type="text"
                    className="form_field"
                    placeholder="User Name*"
                    style={{
                        background: '#1f2123',
                        color: 'lavender',
                    }}
                    {...registration('userName', {
                        required: 'user name is required',
                        minLength: {
                            value: 2,
                            message: 'user name is too short',
                        },
                        maxLength: {
                            value: 16,
                            message: 'user name is too long',
                        },
                    })}
                />
                {regErrors.userName && (
                    <p className="form_error">
                        {(regErrors.userName as any)?.message}
                    </p>
                )}

                {/* ************************************Name field************************************ */}

                <input
                    type="text"
                    className="form_field"
                    placeholder="Full Name*"
                    style={{
                        background: '#1f2123',
                        color: 'lavender',
                    }}
                    {...registration('name', {
                        required: 'name is required',
                        minLength: {
                            value: 2,
                            message: 'name is too short',
                        },
                        maxLength: {
                            value: 26,
                            message: 'name is too long',
                        },
                    })}
                />
                {regErrors.name && (
                    <p className="form_error">
                        {(regErrors.name as any)?.message}
                    </p>
                )}

                {/* ****************************Password field*************************** */}

                <input
                    type="password"
                    className="form_field"
                    placeholder="Password*"
                    style={{
                        background: '#1f2123',
                        color: 'lavender',
                    }}
                    {...registration('password', {
                        required: 'password is required',
                        minLength: {
                            value: 8,
                            message: 'password is too short',
                        },
                        maxLength: {
                            value: 16,
                            message: 'password is too long',
                        },
                    })}
                />
                {regErrors.password && (
                    <p className="form_error">
                        {(regErrors.password as any)?.message}
                    </p>
                )}

                {/* ************************************Email field************************************ */}

                <input
                    type="email"
                    className="form_field"
                    placeholder="Email*"
                    style={{
                        background: '#1f2123',
                        color: 'lavender',
                    }}
                    {...registration('email', {
                        required: 'email is required',
                    })}
                />
                {regErrors.email && (
                    <p className="form_error">
                        {(regErrors.email as any)?.message}
                    </p>
                )}

                {/* ******************************Submit btn***************************** */}

                {!regErrors.email &&
                    !regErrors.password &&
                    !regErrors.name &&
                    !regErrors.userName && (
                        <CustomButton
                            label="Submit"
                            textCol="black"
                            backCol="#e2ff00"
                            width="150px"
                        />
                    )}
                {/* ************************************* */}
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="form_toggleBtn"
                >
                    <p onClick={() => props.toggleLoginForm(true)}>
                        Have an account? Log in
                    </p>
                </motion.span>
                {!regErrors.email &&
                    !regErrors.password &&
                    !regErrors.name &&
                    !regErrors.userName && (
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="form_appPolicies"
                        >
                            <p onClick={() => (modelOpen ? close() : open())}>
                                Privacy Policy &amp; Cookie Policy
                            </p>
                        </motion.span>
                    )}
            </form>
            {/*************************************BACKDROP*************************************/}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {modelOpen && (
                    <WindowBackdropModel
                        backdropColor="rgba(10,10,10,.86)"
                        handleClose={close}
                    >
                        <Policy />
                    </WindowBackdropModel>
                )}
            </AnimatePresence>

            {/*************************************BACKDROP*************************************/}
        </div>
    );
};

export default RegistrationForm;
