import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../core/store/Reduxhooks';
import { dark_colors, light_colors } from '../../../../../../data/ColorConstant';
import Information from './information/Information';

const ApplianceExpand = ({
    id,
    darkTheme,
    applianceExpandBackdropId,
    rgbGadgetExpandBackdropId,
    currentDeviceStatus,
}: any) => {
    const currentDevice = useAppSelector(
        (state: any) =>
            state?.device?.deviceData?.body?.find(
                (device: any) => device.deviceId === id,
            ) ?? null,
    );

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
                    id={id}
                    deviceType={currentDevice?.deviceType}
                    deviceTopic={currentDevice?.deviceTopic}
                    createdAt={currentDevice?.createdAt}
                    updatedAt={currentDevice?.updatedAt}
                    isRemoteActive={['fan', 'airconditioner'].includes(
                        currentDevice?.deviceType.split('/')[1]?.toLowerCase(),
                    )}
                    darkTheme={darkTheme}
                    applianceExpandBackdropId={applianceExpandBackdropId}
                    rgbGadgetExpandBackdropId={rgbGadgetExpandBackdropId}
                    currentDeviceStatus={currentDeviceStatus}
                />
            </section>
        </div>
    );
};

export default ApplianceExpand;
