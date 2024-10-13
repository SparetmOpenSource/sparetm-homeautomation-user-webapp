import { IconContext } from 'react-icons';
import './WidgetError.css';
import { LuServerOff } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import { motion } from 'framer-motion';
import { useQueryClient } from 'react-query';
import { invalidateQueries } from '../../../Utils/HelperFn';

const WidgetError = ({ queryKeys }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const queryClient = useQueryClient();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="widgetError">
            <motion.span>
                <IconContext.Provider
                    value={{
                        size: '2em',
                        color: color?.button,
                    }}
                >
                    <LuServerOff />
                </IconContext.Provider>
                <p style={{ color: color?.text }}>server down (weather)</p>
                <p
                    className="widgetError-reload"
                    onClick={() => invalidateQueries(queryClient, queryKeys)}
                    style={{ color: color?.text }}
                >
                    click to reload
                </p>
            </motion.span>
        </div>
    );
};

export default WidgetError;
