import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import SmilingM from '../../../../../assets/smilingm.svg';
import SmilingW from '../../../../../assets/smilingw.svg';
import { useTheme } from '../../../../../core/router/Themeprovider';
import { useAppDispatch } from '../../../../../core/store/Reduxhooks';
import { SignUpText } from '../../../../../data/ApplicationContent';
import { dark_colors, light_colors } from '../../../../../data/ColorConstant';
import { ADMIN } from '../../../../../data/Constants';
import { useCounter } from '../../../../../hooks/useCounter';
import Form from '../../../../../shared/commoncomponents/submitform/form/Form';
import { useLogin } from '../../../services/Loginuser';
import { useRegister } from '../../../services/Registeruser';
import './Content.css';

const Content = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showSignIn, setshowSignIn] = useState(true);
    const { count } = useCounter(SignUpText?.testimonial?.length, 5000);

    const { mutate: loginMutate } = useLogin(darkTheme, dispatch, navigate);
    const { mutate: registerMutate } = useRegister(darkTheme);

    const handleTypeChange = () => {
        setshowSignIn((prev) => !prev);
    };

    const handleInputData = (data: any) => {
        if (showSignIn) {
            loginMutate(data);
        } else {
            Object.assign(data, { role: ADMIN.toUpperCase() });
            registerMutate(data);
        }
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    const formList: Record<string, any> = [
        {
            id: 1,
            formFormat: 'Input',
            type: 'email',
            placeholder: 'Email*',
            keyName: 'email',
            minLength: 3,
            maxLength: 36,
        },
        {
            id: 2,
            formFormat: 'Input',
            type: 'password',
            placeholder: 'Password*',
            keyName: 'password',
            minLength: 3,
            maxLength: 36,
        },
    ];

    return (
        <section className="signUp-content">
            <section>
                <div>
                    <span>
                        <h1 style={{ color: color?.text }}>
                            What Our Customer Say
                        </h1>
                    </span>
                    <span>
                        <img
                            src={
                                SignUpText?.testimonial[count]?.sex === 'male'
                                    ? SmilingM
                                    : SmilingW
                            }
                            height="90%"
                            width="90%"
                            loading="lazy"
                            alt="testimonial_img"
                        />
                    </span>
                    <span>
                        <section className="signUp-content-left-quote">
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: color?.button,
                                }}
                            >
                                <BiSolidQuoteLeft />
                            </IconContext.Provider>
                        </section>
                        <p style={{ color: color?.icon_font }}>
                            {SignUpText?.testimonial[count]?.content}
                        </p>

                        <section className="signUp-content-right-quote">
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: color?.button,
                                }}
                            >
                                <BiSolidQuoteRight />
                            </IconContext.Provider>
                        </section>
                    </span>
                    <span>
                        <h1 style={{ color: color?.text }}>
                            {SignUpText?.testimonial[count]?.name}
                        </h1>
                        <p style={{ color: color?.text }}>
                            {SignUpText?.testimonial[count]?.designation}
                        </p>
                    </span>
                </div>
            </section>
            <section>
                <Form
                    heading={showSignIn ? 'Sign In!' : 'Sign Up!'}
                    subHeading={
                        showSignIn
                            ? 'We are really happy to see you again!'
                            : 'Let’s Automate Your World, Submit Now!'
                    }
                    formData={handleInputData}
                    formList={formList}
                    btnLabel="submit"
                    switchForm={handleTypeChange}
                    typeFlag={showSignIn}
                />
            </section>
        </section>
    );
};

export default Content;
