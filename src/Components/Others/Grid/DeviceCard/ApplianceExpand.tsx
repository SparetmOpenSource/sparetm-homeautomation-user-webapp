import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import Information from './Information/Information';

const ApplianceExpand = ({
    deviceTopic,
    deviceType,
    createdAt,
    updatedAt,
    id,
    darkTheme,
    isRemoteActive,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="applianceExpand"
            style={{ backgroundColor: color?.element }}
        >
            <section>
                <Information
                    deviceTopic={deviceTopic}
                    deviceType={deviceType}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    id={id}
                    darkTheme={darkTheme}
                    isRemoteActive={isRemoteActive}
                />
            </section>
        </div>
    );
};

export default ApplianceExpand;
