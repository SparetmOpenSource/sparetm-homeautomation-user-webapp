import React from 'react';
import { useAppSelector } from '../../../../../../../core/store/Reduxhooks';
import DeviceAcRemote from './deviceacremote/Deviceacremote';
import DeviceFanRemote from './devicefanremote/Devicefanremote';
import './Deviceremote.css';

interface DeviceRemoteProps {
    deviceId: string;
    darkTheme: boolean;
}

const DeviceRemote: React.FC<DeviceRemoteProps> = ({ deviceId, darkTheme }) => {
    const currentDevice = useAppSelector(
        (state: any) =>
            state?.device?.deviceData?.body?.find(
                (device: any) => device.deviceId === deviceId,
            ) ?? null,
    );

    if (!currentDevice) {
        return <div className="deviceRemote">Device not found</div>;
    }

    const deviceType = currentDevice?.deviceType.split('/')[1]?.toLowerCase();

    return (
        <div className="deviceRemote_container">
            {deviceType === 'fan' && (
                <DeviceFanRemote deviceId={deviceId} darkTheme={darkTheme} />
            )}
            {deviceType === 'airconditioner' && (
                <DeviceAcRemote deviceId={deviceId} darkTheme={darkTheme} />
            )}
            {deviceType !== 'fan' && deviceType !== 'airconditioner' && (
                <div className="deviceRemote">
                    Remote not available for this device type
                </div>
            )}
        </div>
    );
};

export default DeviceRemote;