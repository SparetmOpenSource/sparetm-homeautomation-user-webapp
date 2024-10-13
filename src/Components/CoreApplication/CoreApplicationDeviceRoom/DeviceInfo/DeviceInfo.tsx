import { motion } from 'framer-motion';
import './DeviceInfo.css';
import { IconContext } from 'react-icons';
import { FcFullTrash } from 'react-icons/fc';
import { format } from 'date-fns';

const DeviceInfo = ({ currentDevice, padding, open }: any) => {

    return (
        <section className="deviceInfo" style={{ padding: padding }}>
            <div>
                <span>
                    <h1>Created</h1>
                </span>
                <span>
                    <p>
                        {format(new Date(currentDevice?.createdAt), 'PPPPpp')}
                    </p>
                </span>
            </div>
            <div>
                <span>
                    <h1>Updated</h1>
                </span>
                <span>
                    <p>
                        {format(new Date(currentDevice?.updatedAt), 'PPPPpp')}
                    </p>
                </span>
            </div>
            <div>
                <span>
                    <h1>Type</h1>
                </span>
                <span>
                    <p>{currentDevice?.deviceType.split('/')[0]}</p>
                </span>
            </div>
            <div>
                <span>
                    <h1>Topic</h1>
                </span>
                <span>
                    <p>{currentDevice?.deviceTopic}</p>
                </span>
            </div>
            <div>
                <span>
                    <h1>Click to delete</h1>
                </span>
                <motion.span
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: 'rgb(255, 0, 0, 0.5)',
                    }}
                    onClick={() => open()}
                >
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: 'red',
                        }}
                    >
                        <FcFullTrash />
                    </IconContext.Provider>
                </motion.span>
            </div>
        </section>
    );
};

export default DeviceInfo;

