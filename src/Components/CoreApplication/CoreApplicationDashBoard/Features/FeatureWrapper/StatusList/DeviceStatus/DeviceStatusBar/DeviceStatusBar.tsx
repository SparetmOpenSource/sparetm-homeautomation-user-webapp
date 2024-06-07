import './DeviceStatusBar.css';

const DeviceStatusBar = (props: any) => {
    return (
        <div className="deviceStatusBar" style={{ height: props?.barStatus }}>
            <p>{props?.roomLabel}</p>
            {/* {props?.content} */}
        </div>
    );
};

export default DeviceStatusBar;
