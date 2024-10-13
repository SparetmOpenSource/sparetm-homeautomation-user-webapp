import { useEffect, useState } from 'react';
import './Confirmation.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import Button from '../../CustomButton/Button';

const Confirmation = ({
    heading,
    btnOkFn,
    btnCancelFn,
    btnCancelLabel,
    btnOkLabel,
    darkTheme,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="confirmation">
            <section
                style={{ backgroundColor: color?.inner, color: color?.text }}
            >
                <h1>{heading}</h1>
            </section>
            <section
                style={{ backgroundColor: color?.outer, color: color?.text }}
            >
                <span>
                    <Button
                        label={btnOkLabel}
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="210px"
                        status={false}
                        border={color?.button}
                        fn={btnOkFn}
                    />
                </span>
                <span>
                    <Button
                        label={btnCancelLabel}
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="210px"
                        status={false}
                        border={color?.button}
                        fn={btnCancelFn}
                    />
                </span>
            </section>
        </div>
    );
};

export default Confirmation;
