import { IconContext } from 'react-icons';
import './OptionPage.css';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { motion } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';

const OptionPage = ({ menuType, menuList }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="optionPage" style={{ backgroundColor: color?.inner }}>
            <section>
                <h2 style={{ color: color?.text }}>{menuType}</h2>
                {menuList?.map((item: any) => (
                    <Link to={item?.to} key={item?.id}>
                        <motion.span
                            style={{
                                border:
                                    item?.currentPath === item?.listPath ||
                                    item?.currentPath?.includes(item?.listPath)
                                        ? `2px solid ${color?.button}`
                                        : `2px solid ${color?.border}`,
                            }}
                            initial={{ scale: 1 }}
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.95,
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '1.2em',
                                    color:
                                        item?.currentPath === item?.listPath ||
                                        item?.currentPath?.includes(
                                            item?.listPath,
                                        )
                                            ? color?.button
                                            : color?.icon,
                                }}
                            >
                                {item?.icon}
                            </IconContext.Provider>
                            <p
                                style={{
                                    color:
                                        item?.currentPath === item?.listPath ||
                                        item?.currentPath?.includes(
                                            item?.listPath,
                                        )
                                            ? color?.button
                                            : color?.icon_font,
                                }}
                            >
                                {item?.label}
                            </p>
                        </motion.span>
                    </Link>
                ))}
            </section>
            <section style={{ backgroundColor: color?.inner }}>
                <Outlet />
                {/* <div
                    className="optionPage-block"
                    style={{ backgroundColor: color?.outer }}
                >
                    <h1>Event</h1>
                    <p className="text-block-separation">setting for event</p>
                    <span>
                        <p>asdfg</p>
                        <p>sfaDGzfgh</p>
                        <p>fdsfgh</p>
                        <p>hdgfhghj</p>
                    </span>
                    <p className="text-block-separation">setting for event</p>
                    <span>
                        <p>asdfg</p>
                        <p>sfaDGzfgh</p>
                        <p>fdsfgh</p>
                        <p>hdgfhghj</p>
                    </span>
                </div> */}
                {/* <div
                    className="optionPage-block"
                    style={{ backgroundColor: color?.outer }}
                >
                    <p>Event</p>
                    <span>
                        <p>asdfg</p>
                        <p>sfaDGzfgh</p>
                        <p>fdsfgh</p>
                        <p>hdgfhghj</p>
                    </span>
                </div> */}
                {/* <div
                    className="optionPage-block"
                    style={{ backgroundColor: color?.outer }}
                >
                    <p>Event</p>
                    <span>
                        <p>asdfg</p>
                        <p>sfaDGzfgh</p>
                        <p>fdsfgh</p>
                        <p>hdgfhghj</p>
                    </span>
                </div> */}
                {/* <div
                    className="optionPage-block"
                    style={{ backgroundColor: color?.outer }}
                >
                    <p>Event</p>
                    <span>
                        <p>asdfg</p>
                        <p>sfaDGzfgh</p>
                        <p>fdsfgh</p>
                        <p>hdgfhghj</p>
                    </span>
                </div> */}
            </section>
        </div>
    );
};

export default OptionPage;
