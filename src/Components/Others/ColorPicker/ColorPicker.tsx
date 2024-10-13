import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useEffect, useRef, useState } from 'react';
import './ColorPicker.css';
import iro from '@jaames/iro';

const ColorPicker = ({ rgb, setRgb, darkTheme }: any) => {
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const colorPicker = new (iro as any).ColorPicker(
            colorPickerRef.current!,
            {
                color: rgb,
                width: 280,
                borderWidth: 3,
                borderColor: color?.button,
                layout: [
                    {
                        component: iro.ui.Wheel,
                    },
                    {
                        component: iro.ui.Slider,
                        options: {
                            sliderType: 'alpha',
                        },
                    },
                ],
            },
        );
        colorPicker.on('color:change', (color: iro.Color) => {
            setRgb(color.rgba);
        });
        return () => {
            colorPicker.off('color:change');
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div ref={colorPickerRef} className="color-picker-wheel"></div>;
};

export default ColorPicker;
