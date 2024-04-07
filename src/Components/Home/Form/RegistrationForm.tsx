import { useForm } from 'react-hook-form';
import './Form.css';
import Button from '../../Others/CustomButton/Button';
// import { displayToastify } from '../../../Utils/HelperFn';
// import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';
import TextBlinkAnimation from '../../Others/TextBlinkAnimation/TextBlinkAnimation';
import { RegisterUser } from '../../../Services/RegisterUser';
import { homeUrl } from '../../../Api.tsx/HomeApi';
import { RegistrationCredLength } from '../../../Data/HomePageConstant';
import { SIGNIN_SIGNUP_COLOR } from '../../../Data/ColorConstant';

const RegistrationForm = () => {
    // const [modelOpen, setModelOpen] = useState(false);
    const formColor: any = SIGNIN_SIGNUP_COLOR.FORM;
    const sentence = 'Sign Up!'.split('');
    // const open = () => {
    //     setModelOpen(true);
    // };
    // const close = () => {
    //     setModelOpen(false);
    // };

    const {
        register: registration,
        formState: { errors: regErrors },
        handleSubmit: handleRegSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onRegSubmit = (data: any) => {
        Object.assign(data, { role: 'ADMIN' });
        RegisterUser(homeUrl.app_registration, data);
        reset();
    };
    return (
        <div className="form">
            <form
                onSubmit={handleRegSubmit(onRegSubmit)}
                className="form_wrapper add_css_to_prevent_overflow"
            >
                <h1>
                    {' '}
                    {sentence.map((letter: any, index: any) => {
                        return (
                            <TextBlinkAnimation
                                key={index}
                                color="rgb(242,242,242)"
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

                <input
                    type="email"
                    className="form_field"
                    placeholder="Email*"
                    style={{
                        background: formColor,
                        color: 'white',
                        marginBottom: '1rem',
                    }}
                    {...registration('email', {
                        required: 'email is required',
                    })}
                />
                {regErrors.email && (
                    <p className="form_error">
                        {(regErrors?.email as any)?.message}
                    </p>
                )}

                {/* ****************************Password field*************************** */}

                <input
                    type="password"
                    className="form_field"
                    placeholder="Password*"
                    style={{
                        background: formColor,
                        color: 'white',
                        marginBottom: '1rem',
                    }}
                    {...registration('password', {
                        required: 'password is required',
                        minLength: {
                            value: RegistrationCredLength.password.min,
                            message: 'password is too short',
                        },
                        maxLength: {
                            value: RegistrationCredLength.password.max,
                            message: 'password is too long',
                        },
                    })}
                />
                {regErrors.password && (
                    <p className="form_error">
                        {(regErrors?.password as any)?.message}
                    </p>
                )}

                {/* ******************************Submit btn***************************** */}

                {!regErrors?.email &&
                    !regErrors?.password &&
                    !regErrors?.name &&
                    !regErrors?.userName && (
                        <Button
                            label="Submit"
                            textCol="black"
                            backCol="rgb(8,246,125)"
                            width="150px"
                            // fn={() =>
                            //     displayToastify(
                            //         'Signing Up',
                            //         TOASTIFYCOLOR.DARK,
                            //         TOASTIFYSTATE.INFO,
                            //     )
                            // }
                        />
                    )}
            </form>
            {/*************************************BACKDROP*************************************/}

            {/* <AnimatePresence
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
            </AnimatePresence> */}

            {/*************************************BACKDROP*************************************/}
        </div>
    );
};

export default RegistrationForm;
