import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import './Search.css';
import { useTheme } from '../../../Pages/ThemeProvider';

const Search = (props: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="search">
            <input
                style={{
                    backgroundColor: color?.element,
                    color: color?.text,
                }}
                type="text"
                placeholder={props?.placeholder}
            />
        </div>
    );
};
export default Search;
