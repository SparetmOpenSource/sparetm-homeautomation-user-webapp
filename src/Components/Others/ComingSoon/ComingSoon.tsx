import './ComingSoon.css';
import ComingSoonImg from './../../../Asset/ComingSoonCU.svg';
import { useTheme } from '../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useEffect, useState } from 'react';
import Button from '../CustomButton/Button';

const ComingSoon = ({ page }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="comingSoon">
            <section>
                <span
                    style={{
                        borderLeft: `5px solid ${color?.button}`,
                        // backgroundColor: color?.outer,
                    }}
                >
                    <h2 style={{ color: color?.text }}>COMING SOON</h2>
                    <p style={{ color: color?.text }}>
                        We are almost there! If you want to get notify when{' '}
                    </p>
                    <p style={{ color: color?.text }}>
                        the <i style={{ color: color?.button }}>{page}</i> page
                        goes live, subscribe to our mailing list!
                    </p>
                </span>
                <span style={{ backgroundColor: color?.outer }}>
                    <h1 style={{ color: color?.text }}>
                        Get notified when we launch
                    </h1>

                    <div>
                        <input
                            type="email"
                            placeholder="email"
                            style={{
                                backgroundColor: color?.element,
                                color: color?.text,
                            }}
                        />
                        <Button
                            label="Subscribe"
                            textCol={color?.button}
                            backCol={color?.element}
                            width="150px"
                            status={false}
                            border={color?.button}
                        />
                    </div>
                </span>
            </section>
            <section>
                <img
                    src={ComingSoonImg}
                    height="70%"
                    width="70%"
                    loading="lazy"
                    alt="comingSoon-icon"
                />
            </section>
        </div>
    );
};

export default ComingSoon;
