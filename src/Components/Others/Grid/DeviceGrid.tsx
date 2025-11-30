import { useLocation } from 'react-router-dom';
import { DATA_NOT_FOUND_MSG, deviceTypeArr } from '../../../Data/Constants';
import Appliance from './DeviceCard/Appliance';
import './Grid.css';
import RgbGadget from './DeviceCard/RgbGadget';
import { useAppSelector } from '../../../Features/ReduxHooks';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useTheme } from '../../../Pages/ThemeProvider';

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
