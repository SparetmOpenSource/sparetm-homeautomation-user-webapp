import { useMemo } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import './DoSearch.css';

const DoSearch = ({ placeholder, value, onChange, darkTheme }: any) => {
    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    return (
        <div className="doSearch">
            <input
                type="text"
                placeholder={placeholder}
                style={{
                    backgroundColor: color?.element,
                    color: color?.text,
                }}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
export default DoSearch;
