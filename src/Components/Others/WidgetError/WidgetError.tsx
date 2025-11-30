// refactor code -----------------------------
import './WidgetError.css';
import { LuServerOff } from 'react-icons/lu';
import { useMemo } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';

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
