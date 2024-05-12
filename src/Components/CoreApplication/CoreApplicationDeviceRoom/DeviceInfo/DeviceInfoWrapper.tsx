import { useState } from 'react';
import { DeviceTypeConfig } from '../../../../Data/DeviceRoomConstant';
import DeviceInfo from './DeviceInfo';
import './DeviceInfo.css';
import { AnimatePresence, motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { GiTvRemote } from 'react-icons/gi';
import DeviceRemote from '../DeviceRemote/DeviceRemote';
import ConfirmationBackdropModel from '../../../Others/BackdropModel/ConfirmationBackdropModel/ConfirmationBackdropModel';

const DeviceInfoWrapper = ({
    currentDevice,
    mqttCredDetails,
    deleteDevice,
}: any) => {


     const [modelOpen, setModelOpen] = useState(false);
     const open = () => {
         setModelOpen(true);
     };
     const close = () => {
         setModelOpen(false);
     };


    const [openRemoteOption, setOpenRemoteOption]: any = useState(true);
    const remoteTypeDevice = DeviceTypeConfig.filter(
        (el: any) => el.remote === true,
    );

    const withoutRemoteTypeDevice = DeviceTypeConfig.filter(
        (el: any) => el.remote === false,
    );

    return (
        <div className="deviceInfoWrapper">
            {withoutRemoteTypeDevice.some(
                (item: any) => item.value === currentDevice?.deviceType,
            ) && (
                <DeviceInfo
                    currentDevice={currentDevice}
                    padding="4em 1em 1em 1em"
                    open={open}
                />
            )}

            {remoteTypeDevice.some(
                (item: any) => item.value === currentDevice?.deviceType,
            ) && (
                <section className="deviceInfoWrapper_content">
                    <div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setOpenRemoteOption(true);
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: openRemoteOption ? 'gold' : 'gray',
                                }}
                            >
                                <GiTvRemote />
                            </IconContext.Provider>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setOpenRemoteOption(false);
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: openRemoteOption ? 'gray' : 'gold',
                                }}
                            >
                                <IoIosInformationCircleOutline />
                            </IconContext.Provider>
                        </motion.div>
                    </div>
                    {openRemoteOption && (
                        <DeviceRemote
                            currentDevice={currentDevice}
                            mqttCredDetails={mqttCredDetails}
                        />
                    )}
                    {!openRemoteOption && (
                        <div>
                            <DeviceInfo
                                currentDevice={currentDevice}
                                padding="0em 0.5em 0.5em 0.5em"
                                open={open}
                            />
                        </div>
                    )}
                </section>
            )}
            {/* ************************************************************** */}
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {modelOpen && (
                    <ConfirmationBackdropModel
                        backdropColor="rgb(202, 231, 234, 0.2)"
                        handleClose={close}
                        text="You want to delete this device, Are you sure?"
                        btn_text="Yes"
                        setConfirmation={() => deleteDevice(currentDevice?.deviceId)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default DeviceInfoWrapper;
