// refactor code -----------------------------
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { LuServerOff } from 'react-icons/lu';
import { dark_colors, light_colors } from '../../../data/ColorConstant';
import './Widgeterror.css';

const getThemeColors = (isDark: boolean) =>
    isDark ? dark_colors : light_colors;

const WidgetError = ({ darkTheme }: any) => {

    const color = useMemo(() => getThemeColors(darkTheme), [darkTheme]);

    return (
        <div className="widgetError">
            <motion.span>
                <IconContext.Provider
                    value={{ size: '2em', color: color.button }}
                >
                    <LuServerOff />
                </IconContext.Provider>
                <p style={{ color: color.text }}>server down (weather)</p>
            </motion.span>
        </div>
    );
};

export default WidgetError;
