import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lgAcRemoteCode } from '../../../../../../Data/DeviceRoomConstant';
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
import './DeviceAcRemote.css';

interface DeviceAcRemoteProps {
    deviceId: string;
    darkTheme: boolean;
}

const DeviceAcRemote: React.FC<DeviceAcRemoteProps> = ({ deviceId, darkTheme }) => {
    // const darkTheme = useTheme();
    
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
            toast.warn('No value');
            return;
        }
        
        toast.info(code);
        mutate({ status: true, statusDetail: code } as any);
    };

    const onRemoteCodeSave = (codes: string) => {
        saveDeviceStoreData({ deviceDataStore: codes } as any);
        toast.info(codes);
    };

    if (deviceDataStore.length === 0) {
        return (
            <div className="deviceAcRemote">
                <RemoteConfig
                    deviceType="ac"
                    onSave={onRemoteCodeSave}
                    preConfiguredCodes={lgAcRemoteCode}
                    codeCount={6}
                />
            </div>
        );
    }

    return (
        <div className="deviceAcRemote">
            <section className="deviceAcRemote_saved_details">
                <span>
                    <div>
                        <p>ON/OFF : {deviceDataStore[0]}</p>
                        <p>Temp - : {deviceDataStore[1]}</p>
                        <p>Temp + : {deviceDataStore[2]}</p>
                        <p>Fan speed : {deviceDataStore[3]}</p>
                    </div>
                    <div>
                        <p>Swing LR : {deviceDataStore[4]}</p>
                        <p>Swing UD : {deviceDataStore[5]}</p>
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

            <section className="deviceAcRemote_btn">
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
                        label="Temp -"
                        onClick={() => handleRemoteClick(1)}
                        isActive={deviceDataStore[1] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                    <RemoteButton
                        label="Temp +"
                        onClick={() => handleRemoteClick(2)}
                        isActive={deviceDataStore[2] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                </span>
                <span>
                    <RemoteButton
                        label="Fan Speed"
                        onClick={() => handleRemoteClick(3)}
                        isActive={deviceDataStore[3] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="180px"
                    />
                </span>
                <span>
                    <RemoteButton
                        label="Swing --"
                        onClick={() => handleRemoteClick(4)}
                        isActive={deviceDataStore[4] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                    <RemoteButton
                        label="Swing |"
                        onClick={() => handleRemoteClick(5)}
                        isActive={deviceDataStore[5] === currentDevice?.statusDetail}
                        isDisabled={dataStoreSize === 0}
                        width="80px"
                    />
                </span>
            </section>
        </div>
    );
};

export default DeviceAcRemote;
