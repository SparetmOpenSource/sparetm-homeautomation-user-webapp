import React, { useEffect, useState } from 'react';
import './Search.css';
import {
    dark_colors,
    light_colors,
} from '../../../../../../Data/ColorConstant';

const Search = ({ darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="search" style={{ backgroundColor: color?.inner }}>
            <h1>This feature is under construction</h1>
            <p>great things take time!</p>
        </div>
    );
};

export default Search;
