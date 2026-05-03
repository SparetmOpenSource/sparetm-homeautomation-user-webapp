
import { useTheme } from '../../../../../core/router/themeprovider';
import { dark_colors, light_colors } from '../../../../../data/colorconstant';
import './starterloader.css';

const StarterLoader = () => {
    const darkTheme = useTheme();
    const color = darkTheme ? dark_colors : light_colors;

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
