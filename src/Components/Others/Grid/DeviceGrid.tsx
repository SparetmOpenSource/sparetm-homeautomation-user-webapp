import { useLocation } from 'react-router-dom';
import { deviceTypeArr } from '../../../Data/Constants';
import Appliance from './DeviceCard/Appliance';
import './Grid.css';
import RgbGadget from './DeviceCard/RgbGadget';
import NoData from '../NoData/NoData';
import { useAppSelector } from '../../../Features/ReduxHooks';
// import { MdOutlineAddHomeWork } from 'react-icons/md';
// import { IconContext } from 'react-icons';
// import { useEffect, useState } from 'react';
// import { useTheme } from '../../../Pages/ThemeProvider';
// import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { PiDevicesDuotone } from "react-icons/pi";

const DeviceGrid = () => {
    const location = useLocation();
    // const [color, setColor] = useState<any>(light_colors);
    // const darkTheme: any = useTheme();

    const deviceData = useAppSelector(
        (state: any) => state?.device?.deviceData,
    );

    const onClick = () => {};
    const roomType: any = location?.pathname
        ?.split('/')[3]
        ?.replace('%20', ' ');

    // useEffect(() => {
    //     darkTheme ? setColor(dark_colors) : setColor(light_colors);
    // }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="grid-device">
            {deviceData?.body?.filter(
                (el: any) =>
                    el?.roomType.toLowerCase() === roomType.toLowerCase(),
            ).length === 0 && (
                <section className="grid-device-data-not-available">
                    <NoData
                        item="device"
                        message1="click"
                        onClickMessage={<PiDevicesDuotone/>}
                        message2="to add device"
                        fn={()=>onClick()}
                        
                    />
                </section>
            )}

            {deviceData?.body?.filter(
                (el: any) =>
                    el?.roomType.toLowerCase() === roomType.toLowerCase(),
            ).length !== 0 && (
                <section className="grid-device-data-available">
                    {deviceData?.body
                        ?.filter(
                            (el: any) =>
                                el?.roomType?.toLowerCase() ===
                                    roomType?.toLowerCase() &&
                                el?.deviceType?.toLowerCase()?.split('/')[0] ===
                                    deviceTypeArr[1]?.toLowerCase(),
                        )
                        .map((item: any) => (
                            <Appliance
                                key={item?.deviceId}
                                showName={item?.showName}
                                deviceName={item?.deviceName}
                                deviceType={item?.deviceType}
                                statusValue={item?.status}
                                id={item?.deviceId}
                                roomType={item?.roomType}
                                deviceTopic={item?.deviceTopic}
                                createdAt={item?.createdAt}
                                updatedAt={item?.updatedAt}
                            />
                        ))}
                    {deviceData?.body
                        ?.filter(
                            (el: any) =>
                                el?.roomType?.toLowerCase() ===
                                    roomType.toLowerCase() &&
                                el?.deviceType?.toLowerCase()?.split('/')[0] ===
                                    deviceTypeArr[0]?.toLowerCase(),
                        )
                        .map((item: any) => (
                            <RgbGadget
                                key={item?.deviceId}
                                showName={item?.showName}
                                deviceName={item?.deviceName}
                                statusValue={item?.status}
                                statusDetail={item?.statusDetail}
                                id={item?.deviceId}
                                roomType={item?.roomType}
                                deviceType={item?.deviceType}
                                deviceTopic={item?.deviceTopic}
                                createdAt={item?.createdAt}
                                updatedAt={item?.updatedAt}
                            />
                        ))}
                </section>
            )}
        </div>
    );
};

export default DeviceGrid;
