import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../../../core/router/Themeprovider';
import { useAppSelector } from '../../../../../core/store/Reduxhooks';
import { DATA_NOT_FOUND_MSG, deviceTypeArr } from '../../../../../data/Constants';
import ErrorPage from '../../../../../shared/commoncomponents/errorpage/Errorpage';
import Appliance from './devicecard/Appliance';
import RgbGadget from './devicecard/Rgbgadget';
import './grid.css';

const DeviceGrid = ({ searchQuery = '' }: { searchQuery?: string }) => {
    const location = useLocation();
    const darkTheme = useTheme();

    const roomType: any = location?.pathname
        ?.split('/')[3]
        ?.replace('%20', ' ')
        .toLowerCase();

    const allDevices = useAppSelector(
        (state: any) => state?.device?.deviceData?.body ?? [],
    );

    const devices = allDevices.filter((el: any) =>
        String(el?.deviceName || '').toLowerCase().includes(searchQuery) ||
        String(el?.showName || '').toLowerCase().includes(searchQuery)
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
