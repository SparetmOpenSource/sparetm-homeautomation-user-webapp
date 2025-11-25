import { useEffect, useState } from 'react';
import './StarterLoader.css';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../ThemeProvider';

const StarterLoader = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]);

    return (
        <div className="tile-container">
            <span
                className="tile tile-1"
                style={{ backgroundColor: color?.button }}
            ></span>
            <span
                className="tile tile-2"
                style={{ backgroundColor: color?.button }}
            ></span>
            <span
                className="tile tile-3"
                style={{ backgroundColor: color?.button }}
            ></span>
            <span
                className="tile tile-4"
                style={{ backgroundColor: color?.button }}
            ></span>
        </div>
    );
};

export default StarterLoader;
