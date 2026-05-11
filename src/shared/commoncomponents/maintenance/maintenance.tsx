import { useEffect, useState } from 'react';
import MaintenancePic from '../../../assets/maintenance.svg';
import { dark_colors, light_colors } from '../../../data/ColorConstant';
import { reloadPage } from '../../../utils/HelperFn';
import Button from '../custombutton/Button';
import './Maintenance.css';

const Maintenance = ({ darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="maintenance"
            style={{ backgroundColor: color?.inner, color: color?.text }}
        >
            <img
                src={MaintenancePic}
                height="40%"
                width="40%"
                loading="lazy"
                alt="home_icon"
            />
            <h1 style={{ color: color?.icon }}>We are under maintenance!</h1>
            <p style={{ color: color?.text }}>will be back soon</p>
            <section>
                <Button
                    label="Try Again"
                    textCol={color?.button}
                    backCol={color?.inner}
                    backColOnDis={color?.element}
                    width="250px"
                    status={false}
                    border={color?.button}
                    fn={() => reloadPage()}
                />
            </section>
        </div>
    );
};

export default Maintenance;
