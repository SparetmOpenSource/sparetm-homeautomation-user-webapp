import {
    page_4_getHelp_list,
    page_4_developers_list,
    page_4_docs_list,
    page_4_socialContact_list,
} from './../../../../Data/HomePageConstant';
import './Contact.css';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WindowBackdropModel from '../../../Others/FramerMotionBackdrop/WindowBackdropModel/WindowBackdropModel';
import Policy from '../../Policy/Policy';

const Contact = () => {
    /*************************************BACKDROP*************************************/

    // const [resolutionModelOpen, setResolutionModelOpen] = useState(false);
    // const closeResInfo = () => {
    //     setResolutionModelOpen(false);
    // };
    const [openPrivacyModel, setOpenPrivacyModel] = useState(false);
    const closePrivacy = () => {
        setOpenPrivacyModel(false);
    };
    const openPrivacy = () => {
        setOpenPrivacyModel(true);
    };

    /*************************************BACKDROP*************************************/

    const color_1 = '#2E3438';

    return (
        <div
            className="contact"
            style={{ background: color_1, color: 'lavender' }}
        >
            <section className="contact_content">
                <section className="contact_content_row_1">
                    <section className="contact_content_row_1_col_1">
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
                            <ul>
                                {page_4_socialContact_list.map((item) => (
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
                        </span>
                    </section>
                    <section className="contact_content_row_1_col_2">
                        <span>
                            <p>DOCS</p>
                            <ul>
                                {page_4_docs_list.map((item) => (
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
                        </span>
                        <span>
                            <p>DEVELOPERS</p>
                            <ul>
                                {page_4_developers_list.map((item) => (
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
                        </span>
                        <span>
                            <p>GET HELP</p>
                            <ul>
                                {page_4_getHelp_list.map((item) => (
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
                        </span>
                    </section>
                </section>
                <section className="contact_content_row_2">
                    <div className="contact_content_row_2_content">
                        <ul>
                            <li>
                                <p
                                    onClick={() =>
                                        openPrivacyModel
                                            ? closePrivacy()
                                            : openPrivacy()
                                    }
                                >
                                    PRIVACY POLICY
                                </p>
                            </li>
                            <li>
                                <p
                                    onClick={() =>
                                        openPrivacyModel
                                            ? closePrivacy()
                                            : openPrivacy()
                                    }
                                >
                                    COOKIE POLICY
                                </p>
                            </li>
                            <li>
                                <p>ABOUT</p>
                            </li>
                        </ul>
                        <ul>
                            <li className="contact_content_row_2_content_brand_copyright">
                                COPYRIGHT &copy; 2022 OPENBRIDGE INC. <br />
                                ALL RIGHT RESERVED.
                            </li>
                        </ul>
                    </div>
                </section>
            </section>

            {/***********************************BACKDROP*********************************/}

            {/* <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {resolutionModelOpen && (
                    <InformationBackdropModel
                        backdropColor="rgb(202, 231, 234, 0.2)"
                        handleClose={closeResInfo}
                    >
                         Open Bridge is under testing and needs user feedback. We
                        need some input on screen resolution and would love to
                        get feedback through email. Your screen width is{' '}
                        <span style={{ color: 'orangered' }}>{width}</span>
                        and your screen height is{' '}
                        <span style={{ color: 'orangered' }}>{height}</span>.
                    </InformationBackdropModel>
                )}
            </AnimatePresence>  */}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {openPrivacyModel && (
                    <WindowBackdropModel
                        backdropColor="rgb(31, 33, 35,0.8)"
                        handleClose={closePrivacy}
                    >
                        <Policy />
                    </WindowBackdropModel>
                )}
            </AnimatePresence>

            {/***********************************BACKDROP*********************************/}
        </div>
    );
};

export default Contact;
