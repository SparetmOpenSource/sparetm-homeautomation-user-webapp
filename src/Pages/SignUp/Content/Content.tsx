import { IconContext } from 'react-icons';
import { SignUpText } from '../../../Data/ApplicationContent';
import { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeProvider';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import SubmitForm from '../../../Components/Others/SubmitForm/SubmitForm';
import SmilingW from './../../../Assets/SmilingW.svg';
import SmilingM from './../../../Assets/SmilingM.svg';
import './Content.css';
import { useCounter } from '../../../Hooks/useCounter';

const Content = ({
    formList,
    handleInputData,
    handleTypeChange,
    showSignIn,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const { count } = useCounter(SignUpText?.testimonial.length, 5000);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="signUp-content">
            <section>
                <div>
                    <span>
                        <h1 style={{ color: color?.text }}>
                            {SignUpText?.heading}
                        </h1>
                    </span>
                    <span>
                        <img
                            src={
                                SignUpText?.testimonial[count]?.sex ===
                                SignUpText?.male
                                    ? SmilingM
                                    : SmilingW
                            }
                            height="15%"
                            width="15%"
                            loading="lazy"
                            alt={SignUpText?.testimonial_img_placeholder}
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
                <SubmitForm
                    heading={
                        showSignIn ? SignUpText?.signIn : SignUpText?.signUp
                    }
                    typeChange={handleTypeChange}
                    type={showSignIn}
                    list={formList}
                    setInputData={handleInputData}
                    btnLabel="submit"
                />
            </section>
        </section>
    );
};

export default Content;
