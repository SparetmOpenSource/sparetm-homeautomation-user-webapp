import './DeviceStatus.css';

const DeviceStatus = (props:any) => {
    return (
        <div className="deviceStatus">
            This page is under{' '}
            <span style={{ color: 'green' }}>&nbsp;construction</span>
            <span>&nbsp;{props?.room}</span>
        </div>
    );
};

export default DeviceStatus;
