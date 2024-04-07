import { useForm } from 'react-hook-form';
import './Form.css';
import Button from '../../Others/CustomButton/Button';
import TextBlinkAnimation from '../../Others/TextBlinkAnimation/TextBlinkAnimation';
import { displayToastify } from '../../../Utils/HelperFn';
import {
    APPPROFILE,
    OFFLINECRED,
    TOASTIFYCOLOR,
    TOASTIFYSTATE,
} from '../../../Data/Enum';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../../Services/LogInUser';
import { LogInCredLength } from '../../../Data/HomePageConstant';
import { APPPROFILEKEY } from '../../../Data/Constants';
import { setOfflineUser } from '../../../Utils/ProfileConfigHelperFn';
import { SIGNIN_SIGNUP_COLOR } from '../../../Data/ColorConstant';

const LoginForm = () => {
    const navigate = useNavigate();
    const formColor: any = SIGNIN_SIGNUP_COLOR.FORM;
    const sentence = 'Sign In!'.split('');

    const {
        register: login,
        formState: { errors: logErrors },
        handleSubmit: handleLogSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });
//   data?.password === OFFLINECRED.PASSWORD &&
//       data?.userName === OFFLINECRED.USERNAME;
    const onLogSubmit = (data: any) => {
        reset();
        if (localStorage.getItem(APPPROFILEKEY) === APPPROFILE.STATUSOFF) {
            if (
                data?.password === OFFLINECRED.PASSWORD &&
                data?.email === OFFLINECRED.EMAIL
            ) {
                setOfflineUser(OFFLINECRED.USERNAME, data?.password);
                LoginUser(data, navigate);
            } else {
                displayToastify(
                    'Invalid cred for offline mode',
                    TOASTIFYCOLOR.DARK,
                    TOASTIFYSTATE.INFO,
                );
            }
        } else {
            LoginUser(data, navigate);
        }
    };

    return (
        <div className="form">
            <form
                onSubmit={handleLogSubmit(onLogSubmit)}
                className="form_wrapper"
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
                <p>We are really happy to see you again!</p>

                {/* ***********************UserName field************************* */}

                <input
                    type="text"
                    className="form_field"
                    placeholder="Email"
                    style={{
                        background: formColor,
                        color: 'white',
                        marginBottom: '1.5rem',
                    }}
                    {...login('email', {
                        required: 'email is required',
                        minLength: {
                            value: LogInCredLength.userName.min,
                            message: 'email is too short',
                        },
                        maxLength: {
                            value: LogInCredLength.userName.max,
                            message: 'email is too long',
                        },
                    })}
                />
                {logErrors.userName && (
                    <p className="form_error">
                        {(logErrors.userName as any)?.message}
                    </p>
                )}

                {/* ***************************Password field************************* */}

                <input
                    type="password"
                    className="form_field"
                    placeholder="Password"
                    style={{
                        background: formColor,
                        color: 'white',
                        marginBottom: '1.5rem',
                    }}
                    {...login('password', {
                        required: 'password is required',
                        minLength: {
                            value: LogInCredLength.password.min,
                            message: 'password is too short',
                        },
                        maxLength: {
                            value: LogInCredLength.password.max,
                            message: 'password is too long',
                        },
                    })}
                />
                {logErrors.password && (
                    <p className="form_error">
                        {(logErrors.password as any)?.message}
                    </p>
                )}

                {/* ***************************Submit btn************************** */}

                {!logErrors.password && !logErrors.userName && (
                    <Button
                        label="Submit"
                        textCol="black"
                        backCol="rgb(8,246,125)"
                        width="150px"
                    />
                )}
            </form>
        </div>
    );
};

export default LoginForm;
