import { useMemo, useEffect, useRef } from 'react';
import { dark_colors, light_colors } from '../../../data/ColorConstant';
import './Dosearch.css';

const DoSearch = ({ placeholder, value, onChange, darkTheme, autoFocus }: any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            // A tiny timeout ensures the DOM has completely finished rendering/animating the new tab
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [autoFocus]);

    return (
        <div className="doSearch">
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                style={{
                    backgroundColor: color?.element,
                    color: color?.text,
                }}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
            />
        </div>
    );
};
export default DoSearch;
