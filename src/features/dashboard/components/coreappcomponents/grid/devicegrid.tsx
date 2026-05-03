import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../../../core/router/themeprovider';
import { useAppSelector } from '../../../../../core/store/reduxhooks';
import { DATA_NOT_FOUND_MSG, deviceTypeArr } from '../../../../../data/constants';
import ErrorPage from '../../../../../shared/commoncomponents/errorpage/errorpage';
import Appliance from './devicecard/appliance';
import RgbGadget from './devicecard/rgbgadget';
import './grid.css';

const DeviceGrid = () => {
    const location = useLocation();
    const darkTheme = useTheme();

    const roomType: any = location?.pathname
        ?.split('/')[3]
        ?.replace('%20', ' ')
        .toLowerCase();

    const devices = useAppSelector(
        (state: any) => state?.device?.deviceData?.body ?? [],
    );

    return (
        <div className="device-grid">
            {devices?.filter(
                (el: any) => el?.roomType?.toLowerCase() === roomType,
            ).length === 0 && (
                <section className="device-grid-data-not-available">
                    <ErrorPage
                        errMsg={DATA_NOT_FOUND_MSG}
                        darkTheme={darkTheme}
                    />
                </section>
            )}

            {devices?.filter(
                (el: any) => el?.roomType?.toLowerCase() === roomType,
            ).length !== 0 && (
                <section className="device-grid-data-available">
                    {devices
                        ?.filter(
                            (el: any) =>
                                el?.roomType?.toLowerCase() === roomType &&
                                el?.deviceType?.toLowerCase()?.split('/')[0] ===
                                    deviceTypeArr[1]?.toLowerCase(),
                        )
                        .map((item: any) => (
                            <Appliance
                                key={item?.deviceId}
                                id={item?.deviceId}
                                statusValue={item?.status}
                            />
                        ))}

                    {devices
                        ?.filter(
                            (el: any) =>
                                el?.roomType?.toLowerCase() === roomType &&
                                el?.deviceType?.toLowerCase()?.split('/')[0] ===
                                    deviceTypeArr[0]?.toLowerCase(),
                        )
                        .map((item: any) => (
                            <RgbGadget
                                key={item?.deviceId}
                                id={item?.deviceId}
                                statusValue={item?.status}
                            />
                        ))}
                </section>
            )}
        </div>
    );
};

export default DeviceGrid;
