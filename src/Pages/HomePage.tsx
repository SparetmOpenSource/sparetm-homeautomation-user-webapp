import './GlobalStyling.css';
import { GiCableStayedBridge } from 'react-icons/gi';
import { VscSignIn } from 'react-icons/vsc';
import { MdAddHomeWork } from 'react-icons/md';
import { MdOutlineWifiProtectedSetup } from 'react-icons/md';
import { AppName, home_contact_social_list } from '../Data/Constants';
import { displayToastify, doScroll, observer } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import ButtonLink from '../Components/Others/CustomButton/ButtonLink';
import { useEffect, useRef } from 'react';
import HomePage from './../Assets/HomePage.svg';
import HomeContact from './../Assets/HomeContact.svg';
import HomeSteps from './../Assets/HomeSteps.svg';
import HomeStory from './../Assets/HomeStory.svg';

const Home = () => {
    const paragraphStoryRef: any = useRef(null);
    const paragraphStepsRef: any = useRef(null);
    const paragraphContactRef: any = useRef(null);

    useEffect(() => {
        const hiddenElements = document.querySelectorAll('.hidden-el');
        hiddenElements.forEach((element) => {
            observer.observe(element);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="home">
            <span className="home-opening_scroll_arrow">
                <img
                    className="home-opening_bounce_arrow"
                    src={HomeStory}
                    height="4%"
                    width="4%"
                    loading="lazy"
                    alt="scroll_icon"
                    onClick={() => doScroll(paragraphStoryRef)}
                />
                <img
                    className="home-opening_bounce_arrow"
                    src={HomeSteps}
                    height="4%"
                    width="4%"
                    loading="lazy"
                    alt="scroll_icon"
                    onClick={() => doScroll(paragraphStepsRef)}
                />
                <img
                    className="home-opening_bounce_arrow"
                    src={HomeContact}
                    height="4%"
                    width="4%"
                    loading="lazy"
                    alt="scroll_icon"
                    onClick={() => doScroll(paragraphContactRef)}
                />
            </span>
            <section className="home-opening">
                <div className="home-opening-logo">
                    <GiCableStayedBridge />
                    &nbsp;&nbsp;{AppName}
                </div>
                <h1>Build your home controller in just a few easy steps</h1>
                <h2>
                    Trusted worldwide by millions of DIY enthusiasts eager to
                    take control of their projects
                </h2>

                <div className="home-opening-pic">
                    <img
                        className="home-page-svg"
                        src={HomePage}
                        height="100%"
                        width="100%"
                        loading="lazy"
                        alt="home_icon"
                    />
                </div>
            </section>
            <section className="home-intro">
                <div>
                    <section>
                        <h1 className="hidden-el">
                            The story of {AppName} begins with trust.
                        </h1>
                    </section>
                    <section ref={paragraphStoryRef}>
                        <p className="hidden-el">
                            Trust, as a virtue, has consistently played an
                            essential role in every great human achievement.
                            However, its importance has often been overlooked,
                            not just by individuals, but by entire societies. We
                            feel it is time someone gave it the spotlight it
                            deserves, especially for those who live by this
                            virtue: the trustworthy.
                        </p>
                        <p className="hidden-el">
                            Our innovative app puts homeowners in charge of
                            their smart devices from anywhere. Easily schedule
                            routines, monitor energy usage, and receive tailored
                            recommendations for optimal efficiency. Gain daily
                            insights to optimize your setup and uncover
                            energy-saving opportunities effortlessly. Experience
                            the future of home automation, where control and
                            sustainability converge seamlessly.
                        </p>
                        <p className="hidden-el">
                            If you make it to OpenBridge, congratulations and
                            welcome. we have a lot of things planned for you.
                        </p>
                    </section>
                </div>
                <div ref={paragraphStepsRef}>
                    <section className="hidden-el">
                        <VscSignIn fontSize={50} color="red" />
                        <h1>Sign In and create your profile</h1>
                        <p>
                            Sign in, create your profile, and access all
                            features. Personalize your experience for tailored
                            functionality.
                        </p>
                    </section>
                    <section className="hidden-el">
                        <MdAddHomeWork fontSize={50} color="orange" />
                        <h1>Add your location and room details</h1>
                        <p>
                            Personalize your app with room details. Enhance it
                            by adding a location for weather updates and more.
                        </p>
                    </section>
                    <section className="hidden-el">
                        <MdOutlineWifiProtectedSetup
                            fontSize={50}
                            color="green"
                        />
                        <h1>Setup your device</h1>
                        <p>
                            To set up your device/ESP8266, connect it to your
                            computer, install drivers, and use Arduino IDE to
                            upload code.
                        </p>
                    </section>
                </div>
            </section>
            <section className="home-contact" ref={paragraphContactRef}>
                <div>
                    {' '}
                    <ButtonLink
                        label="Try OpenBridge now"
                        textCol="black"
                        backCol="rgb(8, 246, 125)"
                        width="450px"
                        to="/auth"
                    />
                    <section>
                        {' '}
                        <span>
                            <p>
                                &reg;&nbsp;
                                <span
                                    style={{
                                        color: '#E2FF00',
                                        paddingLeft: '0',
                                    }}
                                >
                                    Sparetm
                                </span>
                            </p>
                            <p>
                                Make this app better by connecting with us
                                &#128512;
                            </p>
                        </span>
                        <span>
                            <div></div>
                            <div>
                                <ul>
                                    {home_contact_social_list.map((item) => (
                                        <li key={item?.id}>
                                            <a
                                                href={item?.href}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {item?.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </span>
                    </section>
                </div>

                <div>
                    <section>
                        {' '}
                        <ul>
                            <li>
                                <p
                                    onClick={() =>
                                        displayToastify(
                                            'Inprogress',
                                            TOASTIFYCOLOR.DARK,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                    // onClick={() =>
                                    //     openPrivacyModel
                                    //         ? closePrivacy()
                                    //         : openPrivacy()
                                    // }
                                >
                                    PRIVACY POLICY
                                </p>
                            </li>
                            <li>
                                <p
                                    onClick={() =>
                                        displayToastify(
                                            'Inprogress',
                                            TOASTIFYCOLOR.DARK,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                    // onClick={() =>
                                    //     openPrivacyModel
                                    //         ? closePrivacy()
                                    //         : openPrivacy()
                                    // }
                                >
                                    COOKIE POLICY
                                </p>
                            </li>
                            <li>
                                {/* <Link to="/about"> */}
                                <p
                                    onClick={() =>
                                        displayToastify(
                                            'Inprogress',
                                            TOASTIFYCOLOR.DARK,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                    // style={{
                                    //     color: 'lavender',
                                    //     textDecoration: 'none',
                                    // }}
                                >
                                    ABOUT
                                </p>
                                {/* </Link> */}
                            </li>
                        </ul>
                    </section>
                    <section>
                        <p>
                            COPYRIGHT &copy; 2023 OPENBRIDGE INC. <br />
                            ALL RIGHT RESERVED.
                        </p>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Home;
