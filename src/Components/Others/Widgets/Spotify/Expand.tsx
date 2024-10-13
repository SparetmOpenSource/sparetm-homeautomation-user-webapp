import { useEffect, useState } from 'react';
import './Spotify.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';

const Expand = ({ darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="spotify-expand"
            style={{ backgroundColor: color?.element }}
        >
            Spotify feature 
        </div>
    );
};

export default Expand;
