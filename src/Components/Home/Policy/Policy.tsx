import { useState } from 'react';
import { PolicyStatement } from './../../../Data/Constant';
import CustomButton from '../../Others/Button/CustomButton';
import HomePrivacy from './../../../Assets/HomePrivacy.svg';
import './Policy.css';

const Policy = () => {
    const [policy, setPolicy] = useState(true);
    return (
        <div className="policy">
            <div
                className="policy_column_1"
                style={{ background: 'rgb(37, 41, 45)' }}
            >
                <span
                    className="policy_column_1_img"
                    style={{
                        background: 'rgb(46, 52, 56)',
                    }}
                >
                    <img
                        src={HomePrivacy}
                        height="90%"
                        width="90%"
                        alt="privacy_policy_logo"
                        loading="lazy"
                    />
                </span>
            </div>
            <div
                className="policy_column_2"
                style={{ background: 'rgb(37, 41, 45)' }}
            >
                <span className="policy_column_2_btn">
                    <CustomButton
                        label="Cookie"
                        textCol="black"
                        backCol="#a5e3b9"
                        width="150px"
                        fn={() => setPolicy(false)}
                    />
                    <CustomButton
                        label="Privacy"
                        textCol="black"
                        backCol="#a5e3b9"
                        width="150px"
                        fn={() => setPolicy(true)}
                    />
                </span>
                <section className="policy_column_2_container">
                    {/* *************************Privacy Policy************************ */}

                    {policy && (
                        <section className="policy_column_2_container_info">
                            <span
                                className="policy_column_2_container_info_header"
                                style={{
                                    color: 'lavender',
                                }}
                            >
                                <h1>{PolicyStatement[0].type}</h1>
                            </span>
                            <span
                                className="policy_column_2_container_info_date"
                                style={{
                                    color: '#909ba6',
                                }}
                            >
                                <p>{PolicyStatement[0].date}</p>
                            </span>
                            <span
                                className="policy_column_2_container_info_statement"
                                style={{
                                    color: 'lavender',
                                }}
                            >
                                <p>{PolicyStatement[0].statement}</p>
                            </span>
                        </section>
                    )}

                    {/* *****************************Cookie Policy******************************* */}

                    {!policy && (
                        <section className="policy_column_2_container_info">
                            <span
                                className="policy_column_2_container_info_header"
                                style={{
                                    color: 'lavender',
                                }}
                            >
                                <h1>{PolicyStatement[1].type}</h1>
                            </span>
                            <span
                                className="policy_column_2_container_info_date"
                                style={{
                                    color: '#909ba6',
                                }}
                            >
                                <p>{PolicyStatement[1].date}</p>
                            </span>
                            <span
                                className="policy_column_2_container_info_statement"
                                style={{
                                    color: 'lavender',
                                }}
                            >
                                <p>{PolicyStatement[1].statement}</p>
                            </span>
                        </section>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Policy;
