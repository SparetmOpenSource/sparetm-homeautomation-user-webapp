import './DeviceStatusBar.css';

const DeviceStatusBar = (props: any) => {
    return <div className="deviceStatusBar" style={{height:props?.barStatus}}></div>;
};

export default DeviceStatusBar;
