import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useEffect, useRef, useState } from 'react';
import iro from '@jaames/iro';

const ColorPicker = ({ rgb, setRgb, darkTheme }: any) => {
    const colorPickerContainerRef = useRef<HTMLDivElement>(null);
    const colorPickerInstanceRef = useRef<any>(null);
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]);

    useEffect(() => {
        const container = colorPickerContainerRef.current;
        if (!container) return;

        colorPickerInstanceRef.current = new (iro as any).ColorPicker(
            container,
            {
                color: rgb,
                width: 280,
                borderWidth: 3,
                borderColor: color?.button,
                layout: [
                    { component: iro.ui.Wheel },
                    {
                        component: iro.ui.Slider,
                        options: { sliderType: 'alpha' },
                    },
                ],
            },
        );

        colorPickerInstanceRef.current.on(
            'color:change',
            (color: iro.Color) => {
                setRgb(color.rgba);
            },
        );

        return () => {
            colorPickerInstanceRef.current.off('color:change');
            if (container) {
                container.innerHTML = '';
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (colorPickerInstanceRef.current && rgb) {
            colorPickerInstanceRef.current.color.set(rgb);
        }
    }, [rgb]);

    return (
        <div 
            ref={colorPickerContainerRef} 
            className="color-picker-wheel"
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%', 
                height: '100%' 
            }}
        ></div>
    );
};

export default ColorPicker;
