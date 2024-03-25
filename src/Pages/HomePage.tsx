import './GlobalStyling.css';
import { GiCableStayedBridge } from 'react-icons/gi';
import { VscSignIn } from 'react-icons/vsc';
import { MdAddHomeWork } from 'react-icons/md';
import { MdOutlineWifiProtectedSetup } from 'react-icons/md';
import { AppName, home_contact_social_list } from '../Data/Constants';
import { displayToastify } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import ButtonLink from '../Components/Others/CustomButton/ButtonLink';

const Home = () => {
    return (
        <div className="home">
            <section className="home-opening">
                <div className="home-opening-logo">
                    <GiCableStayedBridge />
                    &nbsp;&nbsp;{AppName}
                </div>
                <h1>Build your own home controller in just few easy steps</h1>
                <h2>{AppName} is trusted by millions of peoples worldwide</h2>
                <div className="home-opening-pic">yo</div>
            </section>
            <section className="home-intro">
                <div>
                    <section>
                        <h1>the story of {AppName} begins with trust.</h1>
                    </section>
                    <section>
                        <p>
                            trust as a virtue has consistently played an
                            essential role in every great human achievement. and
                            consistently, its importance has been overlooked.
                            not just by individuals, but by entire societies. we
                            felt it was time someone gave it the spotlight it
                            deserves. especially for the ones who live by this
                            virtue: the trustworthy.
                        </p>
                        <p>
                            so we thought of creating a system that rewards its
                            members for doing good and being trustworthy. this
                            way, trust as a virtue becomes something to aspire
                            to, just the way it should be. then we went one step
                            ahead: we built it. we know we are on the right
                            track because here you are.
                        </p>
                        <p>
                            if you make it to OpenBridge, congratulations and
                            welcome. we have a lot of things planned for you.
                        </p>
                    </section>
                </div>
                <div>
                    <section>
                        <VscSignIn fontSize={50} color="red" />
                        <h1>Sign In and create your profile</h1>
                        <p>
                            Customize the design of your shop from over
                            thousands of themes. No design experience or
                            programming skills required.
                        </p>
                    </section>
                    <section>
                        <MdAddHomeWork fontSize={50} color="orange" />
                        <h1>Sign In and create your profile</h1>
                        <p>
                            Customize the design of your shop from over
                            thousands of themes. No design experience or
                            programming skills required.
                        </p>
                    </section>
                    <section>
                        <MdOutlineWifiProtectedSetup
                            fontSize={50}
                            color="green"
                        />
                        <h1>Sign In and create your profile</h1>
                        <p>
                            Customize the design of your shop from over
                            thousands of themes. No design experience or
                            programming skills required.
                        </p>
                    </section>
                </div>
            </section>
            <section className="home-contact">
                <div>
                    {' '}
                    <ButtonLink
                        label="Try OpenBridge now"
                        textCol="black"
                        backCol="#e2ff00"
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
                            <div>helpfull links</div>
                            <div>
                                {' '}
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
                                            'hello shubham',
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
                                            'hello shubham',
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
                                            'hello shubham',
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
                            COPYRIGHT &copy; 2022 OPENBRIDGE INC. <br />
                            ALL RIGHT RESERVED.
                        </p>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Home;
