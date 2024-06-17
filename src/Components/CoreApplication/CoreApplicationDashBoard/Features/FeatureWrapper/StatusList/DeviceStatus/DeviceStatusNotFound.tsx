import './DeviceStatus.css';
import DeviceNotFound from './../../../../../../../Assets/DeviceNotFound.svg';

const DeviceStatusNotFound = (props: any) => {
    return (
        <div className="deviceStatusNotFound">
            <img
                className="home-page-svg"
                src={DeviceNotFound}
                height="80%"
                width="80%"
                loading="lazy"
                alt="home_icon"
            />
        </div>
    );
};

export default DeviceStatusNotFound;
