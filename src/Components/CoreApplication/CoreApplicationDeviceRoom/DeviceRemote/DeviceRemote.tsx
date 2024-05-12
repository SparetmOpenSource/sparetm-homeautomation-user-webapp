import DeviceAcRemote from './DeviceAcRemote/DeviceAcRemote';
import DeviceFanRemote from './DeviceFanRemote/DeviceFanRemote';
import './DeviceRemote.css';

const DeviceRemote = ({ currentDevice, mqttCredDetails }: any) => {
    return (
        <div className="deviceRemote_container">
            {currentDevice?.deviceType.split('/')[1].toLowerCase() ===
                'fan' && (
                <DeviceFanRemote
                    currentDevice={currentDevice}
                    mqttCredDetails={mqttCredDetails}
                />
            )}
            {currentDevice?.deviceType.split('/')[1].toLowerCase() === 'ac' && (
                <DeviceAcRemote
                    currentDevice={currentDevice}
                    mqttCredDetails={mqttCredDetails}
                />
            )}
        </div>
    );
};

export default DeviceRemote;
