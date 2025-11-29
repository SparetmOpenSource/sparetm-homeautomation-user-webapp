import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddColorToRgbModel.css';
import {
    FcAcceptDatabase,
    FcCheckmark,
    FcDataRecovery,
    FcFullTrash,
} from 'react-icons/fc';
import {
    IoIosArrowRoundBack,
    IoIosColorPalette,
    IoIosInformationCircleOutline,
} from 'react-icons/io';
import { BsPalette2 } from 'react-icons/bs';
import { BiCheck } from 'react-icons/bi';
import {
    GadgetRgbDefaultColor,
    GadgetRgbDefaultPattern,
    // RgbDeviceAnimation,
} from '../../../../Data/DeviceRoomConstant';
import DeviceInfo from '../DeviceInfo/DeviceInfo';
import { ConvertTheRangeToRound } from '../../../../Utils/HelperFn';
import {
    useDeleteDevice,
    useDeleteDeviceStoreData,
    useUpdateDeviceStatus,
    useUpdateDeviceStoreData,
} from '../../../../Api.tsx/CoreAppApis';
import ConfirmationBackdropModel from '../../../Others/BackdropModel/ConfirmationBackdropModel/ConfirmationBackdropModel';
import { RgbaColorPicker } from 'react-colorful';
import {
    getAppAdminUser,
    getProfileName,
} from '../../../../Utils/ProfileConfigHelperFn';

const AddColorToRgbModel = ({
    closeAddColorToRgbModel,
    mqttCredDetails,
    currentDevice,
}: any) => {
    const [modelOpen, setModelOpen] = useState(false);
    const open = () => {
        setModelOpen(true);
    };
    const close = () => {
        setModelOpen(false);
    };
    const adminName = getAppAdminUser();
    const profileName = getProfileName();
    const [color, setColor]: any = useState({});
    const [saveColorOption, setSaveColorOption]: any = useState(true);
    const [rgbAnimationOption, setRgbAnimationOption]: any = useState(false);
    const [deviceInfoOption, setDeviceInfoOption]: any = useState(false);
    const [otherColorOption, setOtherColorOption]: any = useState(false);

    const brightness = ConvertTheRangeToRound(
        parseFloat(color?.a),
        0,
        1,
        0,
        100,
    );

    let deviceDataStoreArray = [];
    if (currentDevice?.deviceDataStore !== null) {
        deviceDataStoreArray = currentDevice?.deviceDataStore;
    }

    let statusDetailArr = '177, 216, 213, 0.9, regular';
    if (currentDevice?.statusDetail !== null) {
        statusDetailArr = currentDevice?.statusDetail;
    }

    const onError = (error: any) => {
        let errorDetails = error?.response.data.message;
        if (typeof errorDetails === 'object' && errorDetails !== null) {
            Object.keys(errorDetails).forEach(function eachKey(key) {
                toast.error(errorDetails[key]);
            });
        } else {
            toast.error(errorDetails);
        }
    };

    const { mutate } = useUpdateDeviceStatus(
        currentDevice?.adminName,
        currentDevice?.profileName,
        currentDevice?.roomType,
        currentDevice?.deviceId,
        onError,
    );

    const { mutate: saveDeviceStoreData } = useUpdateDeviceStoreData(
        currentDevice?.deviceId,
        onError,
    );

    const { mutate: removeDeviceStoreData } = useDeleteDeviceStoreData(
        currentDevice?.deviceId,
        onError,
    );

    const { mutate: deleteDevice } = useDeleteDevice(
        adminName,
        profileName,
        onError,
        closeAddColorToRgbModel,
    );

    /*************************/

    const changeToSavedColor = (savedColor: any) => {
        const rgbSavedColor = savedColor.split(',');
        const r = rgbSavedColor[0].split('(')[1];
        const g = rgbSavedColor[1];
        const b = rgbSavedColor[2];
        const a = rgbSavedColor[3].slice(0, -1);

        mutate({
            status: true,
            statusDetail: `${r},${g},${b},${a},${GadgetRgbDefaultPattern}`,
            mqttPublisherId: mqttCredDetails?.mqttPublisherId,
            mqttServerAddress:
                mqttCredDetails?.mqttServerAddress +
                ':' +
                mqttCredDetails?.mqttServerPort,
            brokerUserName: mqttCredDetails?.brokerUserName,
            brokerPassword: mqttCredDetails?.brokerPassword,
        } as any);
        toast.info(`Changing to RGB(${r},${g},${b}) with 100% brightness`);
    };

    const setAnimationToDevice = (animation: any) => {
        mutate({
            status: true,
            statusDetail: `${color?.r},${color?.g},${color?.b},${color?.a},${animation}`,
            mqttPublisherId: mqttCredDetails?.mqttPublisherId,
            mqttServerAddress:
                mqttCredDetails?.mqttServerAddress +
                ':' +
                mqttCredDetails?.mqttServerPort,
            brokerUserName: mqttCredDetails?.brokerUserName,
            brokerPassword: mqttCredDetails?.brokerPassword,
        } as any);
        toast.info(`Changing to ${animation} animation`);
        closeAddColorToRgbModel();
    };

    const saveColorToDeviceDataStore = () => {
        saveDeviceStoreData({
            deviceDataStore: `rgb(${color?.r},${color?.g},${color?.b},1)`,
        } as any);
        toast.info(
            `Selected RGB(${color?.r},${color?.g},${color?.b}) color is saved`,
        );
    };

    const removeColorFromDeviceDataStore = () => {
        removeDeviceStoreData({
            deviceDataStore: `rgb(${color?.r},${color?.g},${color?.b},1)`,
        } as any);
    };

    const setColorToDevice = () => {
        mutate({
            status: true,
            statusDetail: `${color?.r},${color?.g},${color?.b},${color?.a},${GadgetRgbDefaultPattern}`,
            mqttPublisherId: mqttCredDetails?.mqttPublisherId,
            mqttServerAddress:
                mqttCredDetails?.mqttServerAddress +
                ':' +
                mqttCredDetails?.mqttServerPort,
            brokerUserName: mqttCredDetails?.brokerUserName,
            brokerPassword: mqttCredDetails?.brokerPassword,
        } as any);
        toast.info(
            `Changing to RGB(${color?.r},${color?.g},${color?.b}) with ${brightness}% brightness`,
        );
        closeAddColorToRgbModel();
    };

    useEffect(() => {
        let currentRgbColor: any = [
            GadgetRgbDefaultColor[0],
            GadgetRgbDefaultColor[1],
            GadgetRgbDefaultColor[2],
            GadgetRgbDefaultColor[3],
            GadgetRgbDefaultPattern,
        ];
        if (currentDevice?.statusDetail !== null) {
            currentRgbColor = currentDevice?.statusDetail.split(',');
        }
        setColor({
            r: parseInt(currentRgbColor[0]),
            g: parseInt(currentRgbColor[1]),
            b: parseInt(currentRgbColor[2]),
            a: parseFloat(currentRgbColor[3]),
        });
    }, [currentDevice]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="addColorToRgbModel">
            <section className="addColorToRgbModel_resposive">
                {!otherColorOption && (
                    <RgbaColorPicker color={color} onChange={setColor} />
                )}
                {otherColorOption && (
                    <div className="addColorToRgbModel_saved_color">
                        <section>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setRgbAnimationOption(false);
                                    setSaveColorOption(true);
                                    setDeviceInfoOption(false);
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '2em',
                                        color: saveColorOption
                                            ? 'gold'
                                            : 'gray',
                                    }}
                                >
                                    <IoIosColorPalette />
                                </IconContext.Provider>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setRgbAnimationOption(true);
                                    setSaveColorOption(false);
                                    setDeviceInfoOption(false);
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.5em',
                                        color: rgbAnimationOption
                                            ? 'gold'
                                            : 'gray',
                                    }}
                                >
                                    <BsPalette2 />
                                </IconContext.Provider>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setRgbAnimationOption(false);
                                    setSaveColorOption(false);
                                    setDeviceInfoOption(true);
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '2em',
                                        color: deviceInfoOption
                                            ? 'gold'
                                            : 'gray',
                                    }}
                                >
                                    <IoIosInformationCircleOutline />
                                </IconContext.Provider>
                            </motion.div>
                        </section>
                        {saveColorOption && (
                            <section className="addColorToRgbModel_saved_color_container">
                                {deviceDataStoreArray.length !== 0 && (
                                    <div className="addColorToRgbModel_saved_color_container_withData">
                                        {deviceDataStoreArray.map(
                                            (item: any, index: any) => (
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={index}
                                                    style={{
                                                        background: item,
                                                    }}
                                                    onClick={() =>
                                                        changeToSavedColor(item)
                                                    }
                                                >
                                                    {`${item.split(',')[0]},${
                                                        item.split(',')[1]
                                                    },${
                                                        item.split(',')[2]
                                                    })` ===
                                                        `rgb(${color?.r},${color?.g},${color?.b})` && (
                                                        <IconContext.Provider
                                                            value={{
                                                                size: '2em',
                                                                color: 'white',
                                                            }}
                                                        >
                                                            <BiCheck />
                                                        </IconContext.Provider>
                                                    )}
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                )}
                                {deviceDataStoreArray.length === 0 && (
                                    <div className="addColorToRgbModel_saved_color_container_withoutData">
                                        <h1
                                            style={{
                                                color: 'red',
                                            }}
                                        >
                                            COLOR NOT FOUND
                                        </h1>
                                        <p>Please add your favourite color</p>
                                    </div>
                                )}
                            </section>
                        )}
                        {rgbAnimationOption && (
                            <section className="addColorToRgbModel_saved_function_container">
                                {/* {RgbDeviceAnimation.map((item) => (
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={item.id}
                                        onClick={() =>
                                            setAnimationToDevice(item.value)
                                        }
                                    >
                                        <p>{item.name}</p>
                                        <motion.div>
                                            {statusDetailArr.split(',')[4] ===
                                                item.value && (
                                                <IconContext.Provider
                                                    value={{
                                                        size: '2em',
                                                        color: 'black',
                                                    }}
                                                >
                                                    <BiCheck />
                                                </IconContext.Provider>
                                            )}
                                        </motion.div>
                                    </motion.span>
                                ))} */}
                            </section>
                        )}
                        {deviceInfoOption && (
                            <section
                                className="addColorToRgbModel_show_info"
                                style={{ background: 'none' }}
                            >
                                <DeviceInfo
                                    currentDevice={currentDevice}
                                    padding="0"
                                    open={open}
                                />
                            </section>
                        )}
                    </div>
                )}
            </section>
            <section
                style={{
                    background: '#25292d',
                }}
            >
                <div className="addColorToRgbModel_current_color">
                    <div>
                        <span>{color?.r}</span>&nbsp;
                        <span>{color?.g}</span>&nbsp;
                        <span>{color?.b}</span>&nbsp;
                    </div>
                    <div>
                        <span>{brightness}%</span>
                    </div>
                </div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ background: otherColorOption ? '#181818' : '' }}
                    onClick={() => setOtherColorOption(true)}
                    className="addColorToRgbModel_btn"
                >
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: 'white',
                        }}
                    >
                        <FcAcceptDatabase />
                    </IconContext.Provider>
                </motion.div>
                {otherColorOption &&
                    saveColorOption &&
                    deviceDataStoreArray.length !== 0 && (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeColorFromDeviceDataStore()}
                            className="addColorToRgbModel_btn"
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: 'white',
                                }}
                            >
                                <FcFullTrash />
                            </IconContext.Provider>
                        </motion.div>
                    )}
                {!otherColorOption && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => saveColorToDeviceDataStore()}
                        className="addColorToRgbModel_btn"
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'white',
                            }}
                        >
                            <FcDataRecovery />
                        </IconContext.Provider>
                    </motion.div>
                )}
                {!otherColorOption && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="addColorToRgbModel_btn"
                        onClick={() => setColorToDevice()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'white',
                            }}
                        >
                            <FcCheckmark />
                        </IconContext.Provider>
                    </motion.div>
                )}
                {otherColorOption && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="addColorToRgbModel_btn"
                        onClick={() => setOtherColorOption(false)}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'white',
                            }}
                        >
                            <IoIosArrowRoundBack />
                        </IconContext.Provider>
                    </motion.div>
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
                            setConfirmation={() =>
                                deleteDevice(currentDevice?.deviceId)
                            }
                        />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
};

export default AddColorToRgbModel;
