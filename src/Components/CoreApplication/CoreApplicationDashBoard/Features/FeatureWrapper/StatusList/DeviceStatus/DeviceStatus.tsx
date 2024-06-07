import { useNavigate } from 'react-router-dom';
import './DeviceStatus.css';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { TbHomeStats } from 'react-icons/tb';

const DeviceStatus = (props: any) => {
    const navigate = useNavigate();
    const handleRouteToRoom = (routePath: any) => {
        navigate(routePath);
    };
    return (
        <div className="deviceStatus">
            This page is under{' '}
            <span style={{ color: 'green' }}>&nbsp;construction</span>
            <span>
                &nbsp;{props?.room} {props?.roomLabel}
            </span>
            <motion.div
                className="deviceStatus-routeIcon"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                    handleRouteToRoom(
                        `/app/room/${props?.roomLabel
                            ?.replace(' ', '%20')
                            .trim()}`,
                    )
                }
            >
                <IconContext.Provider
                    value={{
                        size: '2em',
                        color: 'lightgreen',
                    }}
                >
                    <TbHomeStats />
                </IconContext.Provider>
            </motion.div>
        </div>
    );
};

export default DeviceStatus;
