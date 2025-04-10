import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import ColorPicker from '../../ColorPicker/ColorPicker';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import './DeviceCard.css';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import {
    ConvertTheRange,
    ConvertTheRangeToRound,
    displayToastify,
    invalidateQueries,
} from '../../../../Utils/HelperFn';
import { usePatchUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import { useAppSelector } from '../../../../Features/ReduxHooks';
import {
    GadgetRgbDefaultColor,
    LandscapeSizeM,
    RGB_GADGET_APPLIANCE_EXPAND,
} from '../../../../Data/Constants';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';
import nanoleaf from '../../../../Assets/nanoleaf.svg';
import { IoCloudDoneOutline } from 'react-icons/io5';
import { ReactSVG } from 'react-svg';
import { BsDatabaseDown } from 'react-icons/bs';
import { VscSymbolColor } from 'react-icons/vsc';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { useBackDropOpen } from '../../../../Pages/ThemeProvider';
import ApplianceExpand from './ApplianceExpand';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';

const RgbGadgetExpand = ({
    darkTheme,
    defaultBrightness,
    background,
    roomType,
    id,
    backDropClose,
    deviceTopic,
    deviceType,
    createdAt,
    updatedAt,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [menu, setMenu] = useState<any>(false);
    const queryClient = useQueryClient();
    const queryKeys = [SELECT_DEVICE_LIST_QUERY_ID];
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const [rgb, setRgb] = useState<any>({
        r: background[0],
        g: background[1],
        b: background[2],
        a: ConvertTheRange(parseFloat(defaultBrightness), 0, 100, 0, 1),
    });
    const [brightness, setBrightness] = useState<number>();

    const onSuccess = () => {
        invalidateQueries(queryClient, queryKeys);
        backDropClose();
    };
    const onError = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const { mutate } = usePatchUpdateData(
        `${featureUrl.update_device}${admin}&profilename=${profile}&roomtype=${roomType}&id=${id}`,
        updateHeaderConfig,
        onSuccess,
        onError,
    );

    const {
        toggleBackDropOpen,
        // setChildForCustomBackDrop,
        // setSizeForCustomBackDrop,
    } = useBackDropOpen();

    const handleMenuChangeForCurrent = () => {
        setMenu(false);
    };

    const handleMenuChangeForSaved = () => {
        setMenu(true);
    };

    const handleColorChange = () => {
        mutate({
            status: true,
            statusDetail: `${rgb?.r},${rgb?.g},${rgb?.b},${rgb?.a},${GadgetRgbDefaultColor[4]}`,
        } as any);
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setBrightness(ConvertTheRangeToRound(parseFloat(rgb?.a), 0, 1, 0, 100));
    }, [rgb?.a]); // eslint-disable-line react-hooks/exhaustive-deps

    console.log(menu);
    return (
        <div
            className="rgbGadgetExpand"
            style={{ backgroundColor: color?.element }}
        >
            <section>
                <ColorPicker rgb={rgb} setRgb={setRgb} darkTheme={darkTheme} />
            </section>
            <section>
                <span
                    style={{
                        color: color?.text,
                        backgroundColor: color?.outer,
                    }}
                >
                    <section>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1.0 }}
                            onClick={() => handleMenuChangeForCurrent()}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color:
                                        menu === false
                                            ? color?.button
                                            : `${
                                                  color?.button.split(')')[0]
                                              },0.3)`,
                                }}
                            >
                                <VscSymbolColor />
                            </IconContext.Provider>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1.0 }}
                            onClick={() => handleMenuChangeForSaved()}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color:
                                        menu === true
                                            ? color?.button
                                            : `${
                                                  color?.button.split(')')[0]
                                              },0.3)`,
                                }}
                            >
                                <BsDatabaseDown />
                            </IconContext.Provider>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1.0 }}
                            style={{ cursor: 'pointer' }}
                            // onClick={() => {
                            //     toggleBackDropOpen();
                            //     setChildForCustomBackDrop(
                            //         <ApplianceExpand
                            //             deviceTopic={deviceTopic}
                            //             deviceType={deviceType}
                            //             createdAt={createdAt}
                            //             updatedAt={updatedAt}
                            //             id={id}
                            //             darkTheme={darkTheme}
                            //             isRemoteActive={
                            //                 deviceType
                            //                     .split('/')[1]
                            //                     .toUpperCase() === 'AC' ||
                            //                 deviceType
                            //                     .split('/')[1]
                            //                     .toUpperCase() === 'FAN'
                            //                     ? true
                            //                     : false
                            //             }
                            //         />,
                            //     );
                            //     setSizeForCustomBackDrop(LandscapeSizeM);
                            // }}
                            onClick={() => {
                                const backdropId = `${RGB_GADGET_APPLIANCE_EXPAND}_${id}`; // Unique ID for this backdrop

                                toggleBackDropOpen(
                                    backdropId,
                                    <ApplianceExpand
                                        deviceTopic={deviceTopic}
                                        deviceType={deviceType}
                                        createdAt={createdAt}
                                        updatedAt={updatedAt}
                                        id={id}
                                        darkTheme={darkTheme}
                                        isRemoteActive={['AC', 'FAN'].includes(
                                            deviceType
                                                .split('/')[1]
                                                .toUpperCase(),
                                        )}
                                    />,
                                    LandscapeSizeM,
                                );
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: color?.button,
                                }}
                            >
                                <HiOutlineInformationCircle />
                            </IconContext.Provider>
                        </motion.div>
                    </section>
                </span>
                <span
                    style={{
                        color: color?.text,
                        backgroundColor: color?.inner,
                    }}
                >
                    {!menu && (
                        <ReactSVG
                            src={nanoleaf}
                            beforeInjection={(svg) => {
                                const primaryElements =
                                    svg.querySelectorAll('.primary');
                                primaryElements.forEach((element) => {
                                    element.setAttribute(
                                        'style',
                                        `fill: rgb(${rgb?.r},${rgb?.g},${rgb?.b}); stroke: ${color?.element};`,
                                    );
                                });
                                const secondaryElements =
                                    svg.querySelectorAll('.secondary');
                                secondaryElements.forEach((element) => {
                                    element.setAttribute(
                                        'style',
                                        `fill: rgb(${rgb?.r},${rgb?.g},${rgb?.b},${rgb?.a}); stroke: ${color?.element};`,
                                    );
                                });
                            }}
                        />
                    )}
                </span>
                <span
                    style={{
                        backgroundColor: color?.outer,
                    }}
                >
                    <div
                        className="rgbGadgetExpand-r"
                        style={{ color: color?.text }}
                    >
                        {rgb?.r}
                    </div>
                    <div
                        className="rgbGadgetExpand-g"
                        style={{ color: color?.text }}
                    >
                        {rgb?.g}
                    </div>
                    <div
                        className="rgbGadgetExpand-b"
                        style={{ color: color?.text }}
                    >
                        {rgb?.b}
                    </div>
                    <div
                        className="rgbGadgetExpand-brightness"
                        style={{
                            backgroundColor: color?.inner,
                            color: color?.text,
                        }}
                    >
                        {brightness}%
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.0 }}
                        style={{ cursor: 'pointer' }}
                        // onClick={() => handleColorChange()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: color?.icon,
                            }}
                        >
                            <IoCloudDoneOutline />
                        </IconContext.Provider>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.0 }}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleColorChange()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: color?.icon,
                            }}
                        >
                            <IoCheckmarkDoneSharp />
                        </IconContext.Provider>
                    </motion.div>
                </span>
            </section>
        </div>
    );
};

export default RgbGadgetExpand;
