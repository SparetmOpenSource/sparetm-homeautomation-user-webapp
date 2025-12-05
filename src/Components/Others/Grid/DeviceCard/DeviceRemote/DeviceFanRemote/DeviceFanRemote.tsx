import 'react-toastify/dist/ReactToastify.css';
import { atomBergRemoteCode } from '../../../../../../Data/DeviceRoomConstant';
import { useDeleteDeviceStoreData, useUpdateDeviceStoreData } from '../../../../../../Api.tsx/CoreAppApis';
import Button from '../../../../CustomButton/Button';
import RemoteButton from '../RemoteButton/RemoteButton';
import RemoteConfig from '../RemoteConfig/RemoteConfig';
import { usePatchUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import { updateHeaderConfig } from '../../../../../../Api.tsx/Axios';
import { displayToastify } from '../../../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../Data/Enum';
import { useAppSelector } from '../../../../../../Features/ReduxHooks';
import './DeviceFanRemote.css';

interface DeviceFanRemoteProps {
    deviceId: string;
    darkTheme: boolean;
}


const DeviceFanRemote: React.FC<DeviceFanRemoteProps> = ({ deviceId, darkTheme }) => {
    const currentDevice = useAppSelector(
        (state: any) =>
            state?.device?.deviceData?.body?.find(
                (device: any) => device.deviceId === deviceId,
            ) ?? null,
    );

    const deviceDataStore = currentDevice?.deviceDataStore || [];
    const dataStoreSize = deviceDataStore.length;

    const onError = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const { mutate } = usePatchUpdateData(
        `${featureUrl.update_device}${deviceId}`,
        updateHeaderConfig,
        () => {},
        onError,
    );

    const { mutate: saveDeviceStoreData } = useUpdateDeviceStoreData(
        deviceId,
        onError,
    );

    const { mutate: removeDeviceStoreData } = useDeleteDeviceStoreData(
        deviceId,
        onError,
    );

    const handleRemoteClick = (index: number) => {
        const code = deviceDataStore[index];
        if (!code) {
            displayToastify('No value', !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.WARN);
            return;
        }
        
        displayToastify(code, !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.INFO);
        mutate({ status: true, statusDetail: code } as any);
    };

    const onRemoteCodeSave = (codes: string) => {
        saveDeviceStoreData({ deviceDataStore: codes } as any);
        displayToastify(codes, !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.INFO);
    };

    if (deviceDataStore.length === 0) {
        return (
            <div className="deviceFanRemote">
                <RemoteConfig
                    deviceType="fan"
                    onSave={onRemoteCodeSave}
                    preConfiguredCodes={atomBergRemoteCode}
                    codeCount={7}
                />
            </div>
        );
    }

    return (
        <div className="deviceFanRemote">
            <section className="deviceFanRemote_saved_details">
                <span>
                    <div>
                        <p>ON/OFF : {deviceDataStore[0]}</p>
                        <p>First speed : {deviceDataStore[1]}</p>
                        <p>Second speed : {deviceDataStore[2]}</p>
                        <p>Third speed : {deviceDataStore[3]}</p>
                    </div>
                    <div>
                        <p>Forth speed : {deviceDataStore[4]}</p>
                        <p>Fifth speed : {deviceDataStore[5]}</p>
                        <p>Sixth speed : {deviceDataStore[6]}</p>
                    </div>
                </span>
                <span>
                    <Button
                        label="Delete"
                        textCol="lavender"
                        backCol="green"
                        width="100px"
                        fn={() =>
                            removeDeviceStoreData({
                                deviceDataStore: deviceDataStore.join(','),
                            } as any)
                        }
                    />
                </span>
            </section>

            <section className="deviceFanRemote_btn">
                <span>
                    <RemoteButton
                        label="ON/OFF"
                        onClick={() => handleRemoteClick(0)}
                        isActive={deviceDataStore[0] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        activeColor="lightgreen"
                        inactiveColor="red"
                        width="100px"
                    />
                </span>
                <span>
                    <RemoteButton
                        label="1"
                        onClick={() => handleRemoteClick(1)}
                        isActive={deviceDataStore[1] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                    <RemoteButton
                        label="2"
                        onClick={() => handleRemoteClick(2)}
                        isActive={deviceDataStore[2] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                </span>
                <span>
                    <RemoteButton
                        label="3"
                        onClick={() => handleRemoteClick(3)}
                        isActive={deviceDataStore[3] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                    <RemoteButton
                        label="4"
                        onClick={() => handleRemoteClick(4)}
                        isActive={deviceDataStore[4] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                </span>
                <span>
                    <RemoteButton
                        label="5"
                        onClick={() => handleRemoteClick(5)}
                        isActive={deviceDataStore[5] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                    <RemoteButton
                        label="6"
                        onClick={() => handleRemoteClick(6)}
                        isActive={deviceDataStore[6] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                </span>
            </section>
        </div>
    );
};

export default DeviceFanRemote;
